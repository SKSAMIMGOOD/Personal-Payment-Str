const upiId = "sksamimgoodboy@sbi";
const payeeName = "SK MD SAMIM";
const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&cu=INR`;
const androidUpiPackages = {
    gpay: "com.google.android.apps.nbu.paisa.user",
    phonepe: "com.phonepe.app",
    paytm: "net.one97.paytm",
    bhim: "in.org.npci.upiapp"
};

function androidAppIntent(packageName) {
    const query = upiLink.slice(upiLink.indexOf("?") + 1);
    const fallback = encodeURIComponent(upiLink);

    return `intent://pay?${query}#Intent;scheme=upi;package=${packageName};S.browser_fallback_url=${fallback};end`;
}

function initialisePaymentPage() {
    const payBtn = document.getElementById("payBtn");
    const copyBtn = document.getElementById("copyBtn");
    const copyBtn2 = document.getElementById("copyBtn2");
    const loader = document.getElementById("loader");
    const toast = document.getElementById("toast");
    const paymentAppLinks = document.querySelectorAll(".payment-app[data-upi-app]");

    function showToast(message) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        window.setTimeout(() => toast.classList.remove("show"), 2500);
    }

    async function copyUpiId(button, defaultLabel) {
        try {
            await navigator.clipboard.writeText(upiId);
            showToast("UPI ID copied");
            button.textContent = "Copied \u2713";
        } catch {
            // Clipboard access may be unavailable on some mobile browsers.
            window.prompt("Copy this UPI ID:", upiId);
            return;
        }

        window.setTimeout(() => {
            button.textContent = defaultLabel;
        }, 2000);
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", () => copyUpiId(copyBtn, "Copy"));
    }

    if (copyBtn2) {
        copyBtn2.addEventListener("click", () => copyUpiId(copyBtn2, "\uD83D\uDCCB Copy UPI ID"));
    }

    if (payBtn) {
        // Keep this as a normal anchor navigation.  UPI apps can only be opened
        // reliably when the upi:// URL is triggered directly by the user click.
        payBtn.href = upiLink;
        payBtn.addEventListener("click", () => {
            if (loader) loader.classList.add("show");
        });
    }

    paymentAppLinks.forEach((link) => {
        const packageName = androidUpiPackages[link.dataset.upiApp];

        // Android Chrome supports app-specific intent links. Other browsers use
        // the standard UPI link so the user can choose any installed UPI app.
        if (packageName && /Android/i.test(navigator.userAgent)) {
            link.href = androidAppIntent(packageName);
        } else {
            link.href = upiLink;
        }

        link.addEventListener("click", () => {
            if (loader) loader.classList.add("show");
        });
    });
}

// script.js is loaded before the loader and toast elements in index.html.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialisePaymentPage, { once: true });
} else {
    initialisePaymentPage();
}
