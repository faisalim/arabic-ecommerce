// الحصول على معرف المنتج من URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// دالة لعرض تفاصيل المنتج
function displayProductDetails() {
    // البحث عن المنتج في المصفوفة
    const product = products.find(p => p.id === parseInt(productId));
    
    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    // تحديث عنوان الصفحة
    document.title = `${product.name} - Fix`;

    // تحديث صورة المنتج
    const productImage = document.querySelector('.product-image');
    productImage.innerHTML = `<img src="${product.image}" alt="${product.name}">`;

    // تحديث معلومات المنتج
    document.querySelector('.product-title').textContent = product.name;
    document.querySelector('.product-price').textContent = `${product.price} ريال`;
    document.querySelector('.product-description').textContent = product.description;

    // إضافة مميزات المنتج
    const featuresList = document.querySelector('.features-list');
    const features = [
        'تفعيل فوري',
        'دعم فني على مدار الساعة',
        'ضمان استرداد الأموال',
        'تحديثات مجانية',
        'توافق مع جميع الأجهزة'
    ];

    features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // دالة لإضافة منتج إلى المشتريات
    function addToPurchasedProducts(product) {
        // التحقق من وجود مستخدم مسجل
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('يرجى تسجيل الدخول أولاً');
            window.location.href = 'login.html';
            return;
        }

        // استرجاع المنتجات المشتراة الحالية
        const purchasedProducts = JSON.parse(
            localStorage.getItem(`purchasedProducts_${currentUser.username}`) || '[]'
        );

        // التحقق من عدم تكرار المنتج
        const isAlreadyPurchased = purchasedProducts.some(
            p => p.id === product.id
        );

        if (isAlreadyPurchased) {
            alert('لقد قمت بشراء هذا المنتج مسبقًا');
            return;
        }

        // إضافة تفاصيل إضافية للمنتج
        const purchasedProduct = {
            ...product,
            purchaseDate: new Date().toLocaleDateString('ar-SA'),
            id: product.id || Date.now() // استخدام معرف فريد
        };

        // حفظ المنتج في المشتريات
        purchasedProducts.push(purchasedProduct);
        localStorage.setItem(
            `purchasedProducts_${currentUser.username}`, 
            JSON.stringify(purchasedProducts)
        );

        // إضافة محاكاة إرسال البريد الإلكتروني
        simulatePurchaseEmail(product);

        alert('تم شراء المنتج بنجاح');
    }

    // دالة محاكاة لإرسال بريد إلكتروني
    function simulatePurchaseEmail(product) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        // إنشاء رسالة شكر
        const emailMessage = {
            to: currentUser.email,
            subject: 'شكراً لشرائك من متجر Fix',
            body: `
مرحباً ${currentUser.username}،

شكراً لشرائك ${product.name} من متجر Fix.

تفاصيل المنتج:
- اسم المنتج: ${product.name}
- السعر: ${product.price} ريال

سنقوم بالتواصل معك قريباً لتسليمك المنتج.

مع أطيب التحيات،
فريق متجر Fix
            `,
            date: new Date().toLocaleString('ar-SA'),
            isRead: false
        };

        // تخزين الرسالة في localStorage
        const emails = JSON.parse(localStorage.getItem('userEmails') || '{}');
        if (!emails[currentUser.username]) {
            emails[currentUser.username] = [];
        }
        emails[currentUser.username].push(emailMessage);
        localStorage.setItem('userEmails', JSON.stringify(emails));

        // إظهار إشعار
        showPurchaseNotification(product);
    }

    // دالة لإظهار إشعار الشراء
    function showPurchaseNotification(product) {
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.classList.add('purchase-notification');
        notification.innerHTML = `
            <div class="notification-content">
                <h3>شكراً على الشراء!</h3>
                <p>لقد قمت بشراء ${product.name}</p>
                <p>سنتواصل معك قريباً لتسليم المنتج</p>
                <button onclick="closeNotification()">إغلاق</button>
            </div>
        `;

        // إضافة الإشعار للصفحة
        document.body.appendChild(notification);

        // إزالة الإشعار بعد 5 ثواني
        setTimeout(() => {
            closeNotification();
        }, 5000);
    }

    // دالة لإغلاق الإشعار
    function closeNotification() {
        const notification = document.querySelector('.purchase-notification');
        if (notification) {
            notification.remove();
        }
    }

    // تعديل دالة إضافة المنتج للسلة لتشمل خيار الشراء المباشر
    function addToCart(product, buyNow = false) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // التحقق من وجود المنتج بالفعل في السلة
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        // إذا كان الشراء المباشر مفعلاً
        if (buyNow) {
            addToPurchasedProducts(product);
        }
    }

    // دالة لتحديث عدد المنتجات في السلة
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartCountElement = document.querySelector('.cart-count');
        
        if (cartCountElement) {
            cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }

    // إضافة وظيفة زر إضافة إلى السلة
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
        updateCartCount();
        
        // إظهار رسالة نجاح
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'تمت إضافة المنتج إلى السلة';
        document.querySelector('.product-actions').appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 2000);
    });

    // تحديث عداد السلة عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', updateCartCount);
}

// تحميل تفاصيل المنتج عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayProductDetails);
