const upiId = "sksamimgoodboy@sbi";
const name = "SK MD SAMIM";

const upiLink =
    `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&cu=INR`;

const copyBtn = document.getElementById("copyBtn");
// const payBtn = document.getElementById("payBtn");
const loader = document.getElementById("loader");

payBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    loader.classList.add("show");

    setTimeout(()=>{

        window.location.href = upiLink;

    },1000);

});

// Copy UPI ID
copyBtn.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(upiId);

        showToast("✅ UPI ID Copied");

        copyBtn.innerHTML = "Copied ✓";

        setTimeout(() => {

            copyBtn.innerHTML = "Copy";

        }, 2000);

        setTimeout(() => {
            copyBtn.innerHTML = "Copy";
        }, 2000);

    }
    catch {

        alert("UPI ID : " + upiId);

    }

});
const copyBtn2 = document.getElementById("copyBtn2");

copyBtn2.addEventListener("click", async ()=>{

    await navigator.clipboard.writeText(upiId);

    copyBtn2.innerHTML="Copied ✓";

    setTimeout(()=>{

        copyBtn2.innerHTML="📋 Copy UPI ID";

    },2000);

});

const toast = document.getElementById("toast");

function showToast(message) {

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// Open UPI App
payBtn.href = upiLink;

// // Optional fallback
payBtn.addEventListener("click", () => {

    setTimeout(() => {

        alert(
            `If no UPI app opened,

Copy this UPI ID:

${upiId}`
        );

    }, 2000);

});
