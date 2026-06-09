// Teltam AI - Main Interactive Logic (Translator Simulator, Form Validators, Pricing and FAQs)

document.addEventListener("DOMContentLoaded", () => {
    // 1. Interactive Translation Simulator Dictionary
    const translationDb = {
        "hello": {
            es: { trans: "Hola", translit: "Oh-lah", pron: "/ˈola/", grammar: "Grammar: Correct (Interjection)" },
            fr: { trans: "Bonjour", translit: "Bon-zhoor", pron: "/bɔ̃ʒuʁ/", grammar: "Grammar: Correct (Interjection)" },
            de: { trans: "Hallo", translit: "Hah-loh", pron: "/ˈhalo/", grammar: "Grammar: Correct (Interjection)" },
            ta: { trans: "வணக்கம் (Vanakkam)", translit: "Va-nak-kam", pron: "/ʋaɳakːam/", grammar: "Grammar: Correct (Polite Greeting)" }
        },
        "hello, how are you?": {
            es: { trans: "Hola, ¿cómo estás?", translit: "Oh-lah, koh-moh ess-tass", pron: "/ˈola ˈkomo esˈtas/", grammar: "Grammar: Perfect. Inverted question mark included." },
            fr: { trans: "Bonjour, comment allez-vous?", translit: "Bon-zhoor, koh-mahnt ah-lay voo", pron: "/bɔ̃ʒuʁ kɔmɑ̃t‿ale vu/", grammar: "Grammar: Perfect (Formal context)." },
            de: { trans: "Hallo, wie geht es dir?", translit: "Hah-loh, vee gayt es deer", pron: "/ˈhalo viː ɡeːt ʔɛs diːɐ̯/", grammar: "Grammar: Correct (Informal context)." },
            ta: { trans: "வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?", translit: "Vanakkam, neengal eppadi irukkireergal?", pron: "/ʋaɳakːam niːŋɡaɭ epːaɖi iɾukːiɾiːɾɡaɭ/", grammar: "Grammar: Contextually polite and grammatically sound." }
        },
        "ai-powered translation is amazing": {
            es: { trans: "La traducción impulsada por IA es increíble", translit: "Lah trah-dook-syohn eem-pool-sah-dah por ee-ah ess een-creh-ee-bleh", pron: "/la tɾaðuɣˈθjon/...", grammar: "Grammar: Correct gender agreement." },
            fr: { trans: "La traduction alimentée par l'IA est incroyable", translit: "Lah trah-dook-syohn ah-lee-mahn-tay par l-ee-ah est ahn-crwa-yahbl", pron: "/la tʁadyksjɔ̃/...", grammar: "Grammar: Correct apostrophe elision." },
            de: { trans: "KI-gestützte Übersetzung ist erstaunlich", translit: "Kah-Ee geh-shtootst-teh oo-ber-zet-soong ist air-shtown-likh", pron: "/kaː ˈiː/...", grammar: "Grammar: Compound noun correctly hyphenated." },
            ta: { trans: "AI-இயங்கும் மொழிபெயர்ப்பு அற்புதம்", translit: "AI-iyangum mozhipeyarppu arputham", pron: "/eɪ-aɪ ijaŋɡuɱ moɻibɛjaɾpːɯ aɾpɯðaɱ/", grammar: "Grammar: Appropriate modern technological term." }
        }
    };

    // Translator Logic (Home & AI Tools Page)
    const translateBtn = document.getElementById("translateBtn");
    const sourceText = document.getElementById("sourceText");
    const targetLang = document.getElementById("targetLanguage");
    const outputText = document.getElementById("outputText");
    const outputTranslit = document.getElementById("outputTranslit");
    const outputPron = document.getElementById("outputPron");
    const outputGrammar = document.getElementById("outputGrammar");
    const activeDetails = document.getElementById("activeDetailsContainer");
    const translationSpinner = document.getElementById("translationSpinner");

    if (translateBtn && sourceText && targetLang && outputText) {
        translateBtn.addEventListener("click", () => {
            const query = sourceText.value.trim().toLowerCase();
            const lang = targetLang.value;

            if (!query) {
                alert("Please enter some text to translate.");
                return;
            }

            // Show Loading Spinner
            translationSpinner.classList.remove("d-none");
            outputText.innerText = "Translating with Teltam LLM...";
            if (activeDetails) activeDetails.classList.add("d-none");

            setTimeout(() => {
                translationSpinner.classList.add("d-none");
                if (activeDetails) activeDetails.classList.remove("d-none");

                // Check in dictionary
                let transResult = "";
                let translitResult = "";
                let pronResult = "";
                let grammarResult = "";

                if (translationDb[query] && translationDb[query][lang]) {
                    const data = translationDb[query][lang];
                    transResult = data.trans;
                    translitResult = data.translit;
                    pronResult = data.pron;
                    grammarResult = data.grammar;
                } else {
                    // Generate AI dynamic fallback translation
                    const fallbackLangs = {
                        es: "La traducción de AI para: ",
                        fr: "Traduction par IA pour: ",
                        de: "KI-Übersetzung für: ",
                        ta: "இதற்கான AI மொழிபெயர்ப்பு: "
                    };
                    const fallbackTranslit = {
                        es: "Lah trah-dook-syohn...",
                        fr: "Lah trah-dook-syohn...",
                        de: "Kah-ee oo-ber-zet-soong...",
                        ta: "AI Mozhi-peyar-ppu..."
                    };
                    transResult = `${fallbackLangs[lang] || "Translated: "}"${sourceText.value}"`;
                    translitResult = fallbackTranslit[lang] || "Transliterated pronunciation guide.";
                    pronResult = `/${lang}-pronunciation/`;
                    grammarResult = "Grammar: Verified context-aware tone.";
                }

                outputText.innerText = transResult;
                if (outputTranslit) outputTranslit.innerText = translitResult;
                if (outputPron) outputPron.innerText = pronResult;
                if (outputGrammar) {
                    outputGrammar.innerText = grammarResult;
                    outputGrammar.className = "small fw-semibold text-success mt-2";
                }

            }, 1000);
        });

        // Trigger translate on pressing enter (Ctrl + Enter)
        sourceText.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && e.ctrlKey) {
                translateBtn.click();
            }
        });
    }

    // Speech synthesis mock (Pronunciation Speaker Button)
    const speakBtn = document.getElementById("speakBtn");
    if (speakBtn && outputText) {
        speakBtn.addEventListener("click", () => {
            const textToSpeak = outputText.innerText;
            if (textToSpeak && !textToSpeak.includes("Translating")) {
                if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(textToSpeak);
                    // Try to match voice code based on selected lang
                    const langCodeMap = { es: "es-ES", fr: "fr-FR", de: "de-DE", ta: "ta-IN" };
                    if (targetLang && langCodeMap[targetLang.value]) {
                        utterance.lang = langCodeMap[targetLang.value];
                    }
                    window.speechSynthesis.speak(utterance);
                    
                    // Add active button animation class
                    speakBtn.classList.add("text-indigo-600");
                    setTimeout(() => speakBtn.classList.remove("text-indigo-600"), 1000);
                } else {
                    alert("Text-to-speech not supported in this browser.");
                }
            }
        });
    }

    // Copy to clipboard
    const copyBtn = document.getElementById("copyBtn");
    if (copyBtn && outputText) {
        copyBtn.addEventListener("click", () => {
            const text = outputText.innerText;
            if (text && !text.includes("Translating")) {
                navigator.clipboard.writeText(text).then(() => {
                    const origIcon = copyBtn.innerHTML;
                    copyBtn.innerHTML = `<i class="fas fa-check text-success"></i>`;
                    setTimeout(() => { copyBtn.innerHTML = origIcon; }, 1500);
                });
            }
        });
    }

    // 2. Custom FAQ Accordion Functionality
    const faqButtons = document.querySelectorAll(".accordion-button-custom");
    faqButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const collapseId = btn.getAttribute("aria-controls");
            const collapseEl = document.getElementById(collapseId);
            
            if (collapseEl) {
                const isActive = btn.classList.contains("active");
                
                // Close all other accordions
                faqButtons.forEach(otherBtn => {
                    if (otherBtn !== btn) {
                        otherBtn.classList.remove("active");
                        const otherCollapse = document.getElementById(otherBtn.getAttribute("aria-controls"));
                        if (otherCollapse) otherCollapse.style.maxHeight = null;
                    }
                });

                if (isActive) {
                    btn.classList.remove("active");
                    collapseEl.style.maxHeight = null;
                } else {
                    btn.classList.add("active");
                    collapseEl.style.maxHeight = collapseEl.scrollHeight + "px";
                }
            }
        });
    });

    // 3. Pricing Plan Switch Toggle (Monthly vs Yearly)
    const pricingSwitch = document.getElementById("billingSwitch");
    if (pricingSwitch) {
        const prices = {
            starter: { monthly: "$9", yearly: "$7" },
            pro: { monthly: "$29", yearly: "$23" },
            enterprise: { monthly: "$99", yearly: "$79" }
        };

        const starterPriceText = document.getElementById("starterPriceText");
        const proPriceText = document.getElementById("proPriceText");
        const enterprisePriceText = document.getElementById("enterprisePriceText");
        const billingPeriods = document.querySelectorAll(".billing-period-text");

        pricingSwitch.addEventListener("change", () => {
            const isYearly = pricingSwitch.checked;

            if (starterPriceText) starterPriceText.innerText = isYearly ? prices.starter.yearly : prices.starter.monthly;
            if (proPriceText) proPriceText.innerText = isYearly ? prices.pro.yearly : prices.pro.monthly;
            if (enterprisePriceText) enterprisePriceText.innerText = isYearly ? prices.enterprise.yearly : prices.enterprise.monthly;

            billingPeriods.forEach(el => {
                el.innerText = isYearly ? "/mo, billed yearly" : "/month";
            });
        });
    }

    // 4. Contact Us Form Validation
    const contactForm = document.getElementById("teltamContactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const phone = document.getElementById("contactPhone").value.trim();
            const subject = document.getElementById("contactSubject").value.trim();
            const message = document.getElementById("contactMessage").value.trim();
            
            let isValid = true;
            
            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!name || name.length < 2) {
                showInputErr("contactName", "Please enter a valid name (min 2 characters)");
                isValid = false;
            } else {
                clearInputErr("contactName");
            }

            if (!emailRegex.test(email)) {
                showInputErr("contactEmail", "Please enter a valid email address");
                isValid = false;
            } else {
                clearInputErr("contactEmail");
            }

            if (phone && phone.length < 7) {
                showInputErr("contactPhone", "Please enter a valid phone number");
                isValid = false;
            } else {
                clearInputErr("contactPhone");
            }

            if (!subject) {
                showInputErr("contactSubject", "Please enter a subject line");
                isValid = false;
            } else {
                clearInputErr("contactSubject");
            }

            if (!message || message.length < 10) {
                showInputErr("contactMessage", "Please enter a message (min 10 characters)");
                isValid = false;
            } else {
                clearInputErr("contactMessage");
            }

            if (isValid) {
                alert(`Thank you, ${name}! Your message has been sent successfully. We will get back to you shortly.`);
                contactForm.reset();
            }
        });
    }

    // 5. Login / Register Form Validations
    const loginForm = document.getElementById("teltamLoginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const pass = document.getElementById("loginPassword").value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let isValid = true;

            if (!emailRegex.test(email)) {
                showInputErr("loginEmail", "Please enter a valid email address");
                isValid = false;
            } else {
                clearInputErr("loginEmail");
            }

            if (!pass || pass.length < 6) {
                showInputErr("loginPassword", "Password must be at least 6 characters");
                isValid = false;
            } else {
                clearInputErr("loginPassword");
            }

            if (isValid) {
                alert("Login Successful! (Mock authorization verified)");
                window.location.href = "index.html";
            }
        });
    }

    const registerForm = document.getElementById("teltamRegisterForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const pass = document.getElementById("registerPassword").value;
            const confirmPass = document.getElementById("registerConfirmPassword").value;
            const agreeTerms = document.getElementById("registerTerms").checked;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let isValid = true;

            if (!name || name.length < 2) {
                showInputErr("registerName", "Please enter a valid name");
                isValid = false;
            } else {
                clearInputErr("registerName");
            }

            if (!emailRegex.test(email)) {
                showInputErr("registerEmail", "Please enter a valid email address");
                isValid = false;
            } else {
                clearInputErr("registerEmail");
            }

            if (!pass || pass.length < 6) {
                showInputErr("registerPassword", "Password must be at least 6 characters");
                isValid = false;
            } else {
                clearInputErr("registerPassword");
            }

            if (pass !== confirmPass) {
                showInputErr("registerConfirmPassword", "Passwords do not match");
                isValid = false;
            } else {
                clearInputErr("registerConfirmPassword");
            }

            if (!agreeTerms) {
                alert("You must agree to the Terms of Service.");
                isValid = false;
            }

            if (isValid) {
                alert("Registration Successful! (Mock account created)");
                window.location.href = "login.html";
            }
        });
    }

    // Helper functions for showing/clearing form input error messages
    function showInputErr(id, message) {
        const inputEl = document.getElementById(id);
        if (inputEl) {
            inputEl.classList.add("is-invalid");
            let feedback = inputEl.nextElementSibling;
            if (feedback && feedback.classList.contains("invalid-feedback")) {
                feedback.innerText = message;
            } else {
                const div = document.createElement("div");
                div.className = "invalid-feedback";
                div.innerText = message;
                inputEl.after(div);
            }
        }
    }

    function clearInputErr(id) {
        const inputEl = document.getElementById(id);
        if (inputEl) {
            inputEl.classList.remove("is-invalid");
        }
    }
});
