// AYAZ MELO 2026 MULTILINGUAL CHATBOT

const chatButton = document.getElementById("ayaz-chat-button");
const chatBox = document.getElementById("ayaz-chat-box");
const closeButton = document.getElementById("ayaz-close");
const messages = document.getElementById("ayaz-messages");
const input = document.getElementById("ayaz-input");
const sendButton = document.getElementById("ayaz-send");
const options = document.getElementById("ayaz-options");

if (chatButton && chatBox) {

  chatButton.addEventListener("click", () => {
    chatBox.classList.add("active");

    if (!messages.dataset.started) {
      messages.dataset.started = "yes";
      welcomeMessage();
      showOptions();
    }
  });

  closeButton.addEventListener("click", () => {
    chatBox.classList.remove("active");
  });

  function detectLanguage(text) {
    if (/[ٻڄڃڏڌڊڙڪگڳڱڻھ]/.test(text)) return "sd";
    if (/[\u0600-\u06FF]/.test(text)) return "ur";
    return "en";
  }

  function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = "ayaz-message " + sender;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  const welcome = {
    en: "Welcome to Ayaz Melo 2026! I am your festival assistant. How can I help you?",
    ur: "ایاز میلو 2026 میں خوش آمدید! میں آپ کا فیسٹیول اسسٹنٹ ہوں۔ میں آپ کی کیا مدد کر سکتا ہوں؟",
    sd: "اياز ميلو 2026 ۾ ڀليڪار! مان توهان جو فيسٽيول اسسٽنٽ آهيان. مان توهان جي ڪهڙي مدد ڪري سگهان ٿو؟"
  };

  function welcomeMessage() {
    const lang = localStorage.getItem("ayazLanguage") || "en";
    addMessage(welcome[lang], "ayaz-bot");
  }

  const questions = {
    en: [
      "What is Ayaz Melo?",
      "When is the festival?",
      "Where is the venue?",
      "How can I register?",
      "How can I contact you?"
    ],
    ur: [
      "ایاز میلو کیا ہے؟",
      "میلہ کب ہوگا؟",
      "میلے کا مقام کہاں ہے؟",
      "رجسٹریشن کیسے کریں؟",
      "رابطہ کیسے کریں؟"
    ],
    sd: [
      "اياز ميلو ڇا آھي؟",
      "ميلو ڪڏھن ٿيندو؟",
      "ميلي جو ھنڌ ڪٿي آھي؟",
      "رجسٽريشن ڪيئن ڪجي؟",
      "رابطو ڪيئن ڪجي؟"
    ]
  };

  function showOptions() {
    options.innerHTML = "";

    const lang = localStorage.getItem("ayazLanguage") || "en";

    questions[lang].forEach(question => {
      const button = document.createElement("button");
      button.className = "ayaz-option";
      button.textContent = question;

      button.addEventListener("click", () => {
        input.value = question;
        sendMessage();
      });

      options.appendChild(button);
    });
  }

  function getAnswer(text, lang) {
    const q = text.toLowerCase();

    const keywords = {
      festival: /ayaz melo|ایاز میلو|اياز ميلو/,
      date: /when|date|کب|تاريخ|تاريخ/,
      venue: /where|venue|location|کہاں|مقام|ھنڌ|ڪٿي/,
      register: /register|registration|رجسٹریشن|رجسٽريشن/,
      contact: /contact|phone|whatsapp|رابطہ|رابطو/
    };

    let topic = "default";

    if (keywords.festival.test(q)) topic = "festival";
    else if (keywords.date.test(q)) topic = "date";
    else if (keywords.venue.test(q)) topic = "venue";
    else if (keywords.register.test(q)) topic = "register";
    else if (keywords.contact.test(q)) topic = "contact";

    const answers = {
      en: {
        festival: "Ayaz Melo is a literary and cultural festival celebrating the legacy of Shaikh Ayaz. It brings together writers, poets, artists and culture lovers.",
        date: "Ayaz Melo 2026 will take place from 19 to 21 December 2026.",
        venue: "The festival is organised by Khanabadosh Writers' Cafe, Qasimabad, Hyderabad, Sindh. Please follow official announcements for venue details.",
        register: "Registration information and volunteer announcements will be shared through the official Ayaz Melo channels.",
        contact: "You can contact the organising team on WhatsApp: 03422564593.",
        default: "Thank you for your question! Please ask about Ayaz Melo, dates, venue, registration or contact details."
      },

      ur: {
        festival: "ایاز میلو شیخ ایاز کے ادبی ورثے کو خراجِ تحسین پیش کرنے والا ادبی اور ثقافتی میلہ ہے۔ اس میں ادیب، شاعر، فنکار اور ثقافت سے محبت کرنے والے شریک ہوتے ہیں۔",
        date: "ایاز میلو 2026، 19 سے 21 دسمبر 2026 تک منعقد ہوگا۔",
        venue: "اس میلے کا انتظام خانہ بدوش رائٹرز کیفے، قاسم آباد، حیدرآباد، سندھ کی جانب سے کیا جاتا ہے۔ مقام کی تفصیلات سرکاری اعلان کے ذریعے جاری ہوں گی۔",
        register: "رجسٹریشن اور رضاکاروں سے متعلق معلومات ایاز میلو کے سرکاری ذرائع سے شیئر کی جائیں گی۔",
        contact: "آپ انتظامی ٹیم سے واٹس ایپ پر رابطہ کر سکتے ہیں: 03422564593۔",
        default: "آپ کے سوال کا شکریہ! ایاز میلو، تاریخ، مقام، رجسٹریشن یا رابطے کے بارے میں پوچھ سکتے ہیں۔"
      },

      sd: {
        festival: "اياز ميلو شيخ اياز جي ادبي ورثي کي ڀيٽا پيش ڪرڻ جو ادبي ۽ ثقافتي ميلو آھي. ھن ۾ اديب، شاعر، فنڪار ۽ ثقافت سان محبت ڪندڙ ماڻهو شريڪ ٿين ٿا.",
        date: "اياز ميلو 2026ع، 19 کان 21 ڊسمبر 2026ع تائين ٿيندو.",
        venue: "ميلي جو انتظام خانه بدوش رائٽرس ڪيفي، قاسم آباد، حيدرآباد، سنڌ پاران ڪيو ويندو آھي. ھنڌ بابت تفصيل سرڪاري اعلان ذريعي ڏنا ويندا.",
        register: "رجسٽريشن ۽ رضاڪارن بابت معلومات اياز ميلي جي سرڪاري ذريعن تان شيئر ڪئي ويندي.",
        contact: "توهان انتظامي ٽيم سان واٽس ايپ تي رابطو ڪري سگھو ٿا: 03422564593.",
        default: "توھان جي سوال لاءِ مھرباني! اياز ميلو، تاريخ، ھنڌ، رجسٽريشن يا رابطي بابت پڇي سگھو ٿا."
      }
    };

    return answers[lang][topic];
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "ayaz-user");

    const lang = detectLanguage(text);
    const answer = getAnswer(text, lang);

    input.value = "";

    setTimeout(() => {
      addMessage(answer, "ayaz-bot");
    }, 400);
  }

  sendButton.addEventListener("click", sendMessage);

  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  window.addEventListener("storage", event => {
    if (event.key === "ayazLanguage") {
      showOptions();
    }
  });
}
