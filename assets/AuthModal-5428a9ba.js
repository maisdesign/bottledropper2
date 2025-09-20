var p=Object.defineProperty;var g=(r,t,e)=>t in r?p(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var h=(r,t,e)=>(g(r,typeof t!="symbol"?t+"":t,e),e);import{l as s,a as u}from"./index-80099ef7.js";import"./phaser-f8c8a439.js";import"./supabase-2481e69c.js";class b{constructor(){h(this,"element");h(this,"onAuthCallback");h(this,"currentStep","welcome");h(this,"currentEmail","");this.element=this.createElement(),this.setupEventListeners(),this.setupLanguageListener(),document.body.appendChild(this.element)}createElement(){const t=document.createElement("div");return t.id="auth-modal",t.className="auth-modal hidden",t.innerHTML=this.getModalHTML(),t}getModalHTML(){const t=s.getTranslation();return`
      <div class="auth-modal-backdrop">
        <div class="auth-modal-content">
          <!-- Welcome Step -->
          <div class="auth-step" id="auth-step-welcome">
            <h2>${t.authWelcome}</h2>
            <p>${t.authSignInToPlay}</p>

            <div class="auth-buttons">
              <button id="auth-google" class="auth-button auth-button-google">
                <span>🔍</span> ${t.authContinueGoogle}
              </button>

              <button id="auth-email" class="auth-button auth-button-email">
                <span>📧</span> ${t.authContinueEmail}
              </button>
            </div>

            <button id="auth-close" class="auth-close-btn">×</button>
          </div>

          <!-- Email Step -->
          <div class="auth-step hidden" id="auth-step-email">
            <h2>${t.authEmailTitle}</h2>
            <p>${t.authEmailSubtitle}</p>

            <div class="auth-form">
              <input
                type="email"
                id="auth-email-input"
                placeholder="${t.authEmailPlaceholder}"
                class="auth-input"
              >
              <button id="auth-send-otp" class="auth-button auth-button-primary">
                ${t.authSendCode}
              </button>
              <button id="auth-back-welcome" class="auth-button auth-button-secondary">
                ${t.authBack}
              </button>
            </div>
          </div>

          <!-- Verify Step -->
          <div class="auth-step hidden" id="auth-step-verify">
            <h2>${t.authVerifyTitle}</h2>
            <p>${t.authVerifySubtitle}</p>

            <div class="auth-form">
              <input
                type="text"
                id="auth-otp-input"
                placeholder="${t.authOtpPlaceholder}"
                class="auth-input auth-input-otp"
                maxlength="6"
              >
              <button id="auth-verify-otp" class="auth-button auth-button-primary">
                ${t.authVerify}
              </button>
              <button id="auth-back-email" class="auth-button auth-button-secondary">
                ${t.authBack}
              </button>
            </div>
          </div>

          <!-- Profile Setup Step -->
          <div class="auth-step hidden" id="auth-step-profile">
            <h2>${t.authProfileTitle}</h2>
            <p>${t.authProfileSubtitle}</p>

            <div class="auth-form">
              <input
                type="text"
                id="auth-nickname-input"
                placeholder="${t.authNicknamePlaceholder}"
                class="auth-input"
                maxlength="20"
              >

              <div class="consent-checkbox">
                <label>
                  <input type="checkbox" id="marketing-consent" class="auth-checkbox">
                  ${t.authMarketingConsent}
                </label>
              </div>

              <button id="auth-complete" class="auth-button auth-button-primary">
                ${t.authStartPlaying}
              </button>
            </div>
          </div>

          <!-- Loading overlay -->
          <div class="auth-loading hidden" id="auth-loading">
            <div class="spinner"></div>
            <p>${t.authProcessing}</p>
          </div>
        </div>
      </div>
    `}setupEventListeners(){var t,e,a,i,n,o,c,d,m;(t=this.element.querySelector("#auth-close"))==null||t.addEventListener("click",()=>{this.hide()}),(e=this.element.querySelector("#auth-google"))==null||e.addEventListener("click",async()=>{await this.handleGoogleSignIn()}),(a=this.element.querySelector("#auth-email"))==null||a.addEventListener("click",()=>{this.showStep("email")}),(i=this.element.querySelector("#auth-send-otp"))==null||i.addEventListener("click",async()=>{await this.handleSendOTP()}),(n=this.element.querySelector("#auth-verify-otp"))==null||n.addEventListener("click",async()=>{await this.handleVerifyOTP()}),(o=this.element.querySelector("#auth-back-welcome"))==null||o.addEventListener("click",()=>{this.showStep("welcome")}),(c=this.element.querySelector("#auth-back-email"))==null||c.addEventListener("click",()=>{this.showStep("email")}),(d=this.element.querySelector("#auth-complete"))==null||d.addEventListener("click",async()=>{await this.handleCompleteProfile()}),(m=this.element.querySelector(".auth-modal-backdrop"))==null||m.addEventListener("click",l=>{l.target===l.currentTarget&&this.hide()}),this.element.addEventListener("keydown",l=>{l.key==="Escape"&&this.hide(),l.key==="Enter"&&this.handleEnterKey()})}setupLanguageListener(){s.onLanguageChange(()=>{this.element.innerHTML=this.getModalHTML(),this.setupEventListeners(),this.showStep(this.currentStep)})}async handleGoogleSignIn(){this.showLoading(!0);try{const t=await u.signInWithGoogle();if(t.success)console.log("Google sign in initiated");else{const e=s.getTranslation();this.showError(t.error||e.authGoogleFailed),this.showLoading(!1)}}catch(t){console.error("Google sign in error:",t);const e=s.getTranslation();this.showError(e.authUnexpectedError),this.showLoading(!1)}}async handleSendOTP(){const t=this.element.querySelector("#auth-email-input"),e=t==null?void 0:t.value.trim();if(!e||!e.includes("@")){const a=s.getTranslation();this.showError(a.authInvalidEmail);return}this.currentEmail=e,this.showLoading(!0);try{const a=await u.signInWithOTP(e);if(a.success){this.showStep("verify");const i=s.getTranslation();this.showSuccess(i.authCodeSent)}else{const i=s.getTranslation();this.showError(a.error||i.authSendFailed)}}catch(a){console.error("Send OTP error:",a);const i=s.getTranslation();this.showError(i.authUnexpectedError)}finally{this.showLoading(!1)}}async handleVerifyOTP(){var a;const t=this.element.querySelector("#auth-otp-input"),e=t==null?void 0:t.value.trim();if(!e||e.length!==6){const i=s.getTranslation();this.showError(i.authCodeLength);return}this.showLoading(!0);try{const i=await u.verifyOTP(this.currentEmail,e);if(i.success){await new Promise(o=>setTimeout(o,1e3));const n=u.getState();if(n.isAuthenticated)(a=n.profile)!=null&&a.nickname?this.completeAuth(!0):this.showStep("profile");else{const o=s.getTranslation();this.showError(o.authFailed)}}else{const n=s.getTranslation();this.showError(i.error||n.authInvalidCode)}}catch(i){console.error("Verify OTP error:",i);const n=s.getTranslation();this.showError(n.authVerifyFailed)}finally{this.showLoading(!1)}}async handleCompleteProfile(){const t=this.element.querySelector("#auth-nickname-input"),e=this.element.querySelector("#marketing-consent"),a=(t==null?void 0:t.value.trim())||null,i=(e==null?void 0:e.checked)||!1;this.showLoading(!0);try{await u.updateProfile({nickname:a,consent_marketing:i,consent_timestamp:i?new Date().toISOString():null}),this.completeAuth(!0)}catch(n){console.error("Profile update error:",n);const o=s.getTranslation();this.showError(o.authProfileFailed),this.showLoading(!1)}}showStep(t){this.element.querySelectorAll(".auth-step").forEach(a=>{a.classList.add("hidden")});const e=this.element.querySelector(`#auth-step-${t}`);if(e){e.classList.remove("hidden"),this.currentStep=t;const a=e.querySelector("input");a&&setTimeout(()=>a.focus(),100)}}showLoading(t){const e=this.element.querySelector("#auth-loading");e&&e.classList.toggle("hidden",!t)}showError(t){this.element.querySelectorAll(".auth-alert").forEach(i=>i.remove());const e=document.createElement("div");e.className="auth-alert auth-alert-error",e.textContent=t;const a=this.element.querySelector(".auth-step:not(.hidden)");a&&a.insertBefore(e,a.firstChild),setTimeout(()=>e.remove(),5e3)}showSuccess(t){this.element.querySelectorAll(".auth-alert").forEach(i=>i.remove());const e=document.createElement("div");e.className="auth-alert auth-alert-success",e.textContent=t;const a=this.element.querySelector(".auth-step:not(.hidden)");a&&a.insertBefore(e,a.firstChild),setTimeout(()=>e.remove(),3e3)}handleEnterKey(){var t,e,a;switch(this.currentStep){case"email":(t=this.element.querySelector("#auth-send-otp"))==null||t.dispatchEvent(new Event("click"));break;case"verify":(e=this.element.querySelector("#auth-verify-otp"))==null||e.dispatchEvent(new Event("click"));break;case"profile":(a=this.element.querySelector("#auth-complete"))==null||a.dispatchEvent(new Event("click"));break}}completeAuth(t){this.onAuthCallback&&this.onAuthCallback(t),this.hide()}show(){this.element.classList.remove("hidden"),this.showStep("welcome"),setTimeout(()=>{const t=this.element.querySelector(".auth-button");t==null||t.focus()},100)}hide(){this.element.classList.add("hidden")}onAuth(t){this.onAuthCallback=t}destroy(){this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}export{b as AuthModal};
//# sourceMappingURL=AuthModal-5428a9ba.js.map
