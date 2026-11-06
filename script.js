document.addEventListener("DOMContentLoaded", function () {

    const chatButton = document.getElementById("ayaz-chat-button");
    const chatBox = document.getElementById("ayaz-chat-box");
    const closeButton = document.getElementById("ayaz-close");
    const messages = document.getElementById("ayaz-messages");
    const options = document.getElementById("ayaz-options");
    const input = document.getElementById("ayaz-input");
    const sendButton = document.getElementById("ayaz-send");

    if (!chatButton || !chatBox || !messages || !options) return;

    const translations = {
        en: {
            welcome: "Welcome to Ayaz Melo 2026! How can we help you?",
            date: "Ayaz Melo 2026 will be held from 19 to 21 December 2026.",
            venue: "The official venue will be announced soon.",
            registration: "Registration details will be available through our official website.",
            volunteer: "For volunteer information, please contact the organising team.",
            stalls: "For book and cultural stall bookings, contact our organising team.",
            about: "Ayaz Melo is a literary and cultural festival celebrating Shaikh Ayaz, Sindhi literature, language and culture.",
            contact: "Contact our organising team at 03422564593.",
            fallback: "Thank you for your question. Please contact our organising team at 03422564593."
        },

        ur: {
            welcome: "ایاز میلو 2026 میں خوش آمدید! ہم آپ کی کیا مدد کر سکتے ہیں؟",
            date: "ایاز میلو 2026، 19 سے 21 دسمبر 2026 تک منعقد ہوگا۔",
            venue: "میلے کے مقام کا باضابطہ اعلان جلد کیا جائے گا۔",
            registration: "رجسٹریشن کی تفصیلات ہماری سرکاری ویب سائٹ پر دستیاب ہوں گی۔",
            volunteer: "رضاکاروں کے بارے میں معلومات کے لیے آرگنائزنگ ٹیم سے رابطہ کریں۔",
            stalls: "کتابوں اور ثقافتی اسٹالز کی بکنگ کے لیے آرگنائزنگ ٹیم سے رابطہ کریں۔",
            about: "ایاز میلو شیخ ایاز، سندھی ادب، زبان اور ثقافت کو خراجِ تحسین پیش کرنے والا ادبی اور ثقافتی میلہ ہے۔",
            contact: "آرگنائزنگ ٹیم سے رابطہ کریں: 03422564593",
            fallback: "آپ کے سوال کا شکریہ۔ مزید معلومات کے لیے آرگنائزنگ ٹیم سے رابطہ کریں: 03422564593"
        },

        sd: {
            welcome: "اياز ميلو 2026 ۾ ڀليڪار! اسان توهان جي ڪهڙي مدد ڪري سگهون ٿا؟",
            date: "اياز ميلو 2026، 19 کان 21 ڊسمبر 2026 تائين منعقد ٿيندو.",
            venue: "ميلي جي هنڌ جو باضابطه اعلان جلد ڪيو ويندو.",
            registration: "رجسٽريشن بابت تفصيل اسان جي سرڪاري ويب سائيٽ تي موجود هوندا.",
            volunteer: "رضاڪارن بابت معلومات لاءِ آرگنائيزنگ ٽيم سان رابطو ڪريو.",
            stalls: "ڪتابن ۽ ثقافتي اسٽالن جي بکنگ لاءِ آرگنائيزنگ ٽيم سان رابطو ڪريو.",
            about: "اياز ميلو شيخ اياز، سنڌي ادب، ٻولي ۽ ثقافت کي ڀيٽا پيش ڪرڻ وارو ادبي ۽ ثقافتي ميلو آهي.",
            contact: "آرگنائيزنگ ٽيم سان رابطو ڪريو: 03422564593",
            fallback: "توهان جي سوال لاءِ مهرباني. وڌيڪ معلومات لاءِ آرگنائيزنگ ٽيم سان رابطو ڪريو: 03422564593"
        }
    };

    function detectLanguage(text) {
        if (/[\u0600-\u06FF]/.test(text)) {
            // Sindhi-specific letters
            if (/[ٻڄڃڏڌڊڙڪگڳڱڻھء]/.test(text)) {
                return "sd";
            }
            return "ur";
        }
        return "en";
    }

    function addMessage(text, sender, language) {
        const message = document.createElement("div");
        message.className = "ayaz-message " + sender;
        message.textContent = text;

        if (language === "ur" || language === "sd") {
            message.dir = "rtl";
            message.style.textAlign = "right";
        }

        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function getAnswer(question, language) {
        const q = question.toLowerCase();
        const t = translations[language];

        if (/date|when|ڪڏهن|تاريخ|کب|تاریخ|وقت/.test(q)) {
            return t.date;
        }

        if (/venue|where|location|ڪٿي|جڳھ|مقام|کہاں|مقام/.test(q)) {
            return t.venue;
        }

        if (/registration|register|رجسٽريشن|رجسٹریشن/.test(q)) {
            return t.registration;
        }

        if (/volunteer|رضاڪار|رضاکار/.test(q)) {
            return t.volunteer;
        }

        if (/stall|book|اسٽال|ڪتاب|اسٹال|کتاب/.test(q)) {
            return t.stalls;
        }

        if (/about|what is|ayaz melo|اياز ميلو|شیخ ایاز|ایاز میلو/.test(q)) {
            return t.about;
        }

        if (/contact|phone|number|رابطو|نمبر|رابطہ|فون/.test(q)) {
            return t.contact;
        }

        return t.fallback;
    }

    function showOptions(language) {
        options.innerHTML = "";

        const questions = {
            en: ["When is Ayaz Melo?", "Where is the venue?", "How can I register?", "How can I volunteer?", "Contact information"],
            ur: ["ایاز میلو کب ہوگا؟", "میلے کا مقام کیا ہے؟", "رجسٹریشن کیسے کریں؟", "رضاکار کیسے بنیں؟", "رابطہ معلومات"],
            sd: ["اياز ميلو ڪڏهن ٿيندو؟", "ميلي جو هنڌ ڪٿي آهي؟", "رجسٽريشن ڪيئن ڪجي؟", "رضاڪار ڪيئن بڻجي؟", "رابطي جي معلومات"]
        };

        questions[language].forEach(function (question) {
            const button = document.createElement("button");
            button.className = "ayaz-option";
            button.textContent = question;

            button.addEventListener("click", function () {
                const lang = detectLanguage(question);
                addMessage(question, "ayaz-user", lang);
                addMessage(getAnswer(question, lang), "ayaz-bot", lang);
            });

            options.appendChild(button);
        });
    }

    function sendMessage() {
        const question = input.value.trim();
        if (!question) return;

        const language = detectLanguage(question);

        addMessage(question, "ayaz-user", language);

        setTimeout(function () {
            addMessage(getAnswer(question, language), "ayaz-bot", language);
        }, 300);

        showOptions(language);
        input.value = "";
    }

    chatButton.addEventListener("click", function () {
        chatBox.classList.toggle("active");

        if (messages.children.length === 0) {
            addMessage(translations.en.welcome, "ayaz-bot", "en");
            showOptions("en");
        }
    });

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            chatBox.classList.remove("active");
        });
    }

    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
    }

    if (input) {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }

});
