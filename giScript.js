const getUrlVars = () => {
    let vars = [],
        hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

const messagePH = (language) => {
    const messageField = document.getElementById('message')
    if (messageField) {
        const messagePlaceholder = (language == 'Arabic' || language == 'arabic') ? 'اترك رسالتك' : 'Leave Your Message';
        //Placeholder, change to Arabic by replacing the Leave Your Message text with اترك رسالتك
        document.getElementById('message').placeholder = messagePlaceholder;
    }
    if (language == 'Arabic' || language == 'arabic') {
        let rtlStyle = document.createElement('style');
        rtlStyle.appendChild(document.createTextNode(`h1, h2, h3, h4, h5, h6, p, ul, li, ol, span, input, textarea, select, label {
            /* change ltr to rtl for right to left */
              direction: rtl !important;
            /* change left to right for right to left */
              text-align: right;
            }`
        ));
        document.getElementsByTagName('head')[0].appendChild(rtlStyle);
    }
}

const fixedHeader = (et) => {
    //Fixed Menu (Header or footer) v1.3.1
    const boxToAppend = document.querySelector('.fixed-header');
    if (boxToAppend == undefined) {
        return
    }
    let backgroundCSS = `
        position: fixed;
        left: 0;
        top: 0px;
        bottom: auto;
        width: 100%;
        z-index: 899;
    `;
    let colorOverlayCSS = `
        position: fixed;
        left: 0;
        top: 0px;
        bottom: auto;
        width: 100%;
        z-index: auto;
        border-style: none none none none;
    `;
    let childrenCSS = `
        position: fixed;
        left: auto;
        top: 0px;
        bottom: auto;
        width: 100%;
        z-index: 999;
        border-style: none none none none;
        border-width: 0px;
        background: none;
    `;
    const boxParent = boxToAppend.parentElement;
    const boxClone = boxToAppend.cloneNode(true);
    boxParent.appendChild(boxClone)
    boxClone.style.cssText = backgroundCSS;
    boxClone.innerHTML = '';
    boxToAppend.style.cssText = childrenCSS;
    boxClone.appendChild(document.getElementById(`${boxToAppend.id}-color-overlay`));
    document.getElementById(`${boxToAppend.id}-color-overlay`).style = colorOverlayCSS;
}

const callButtonHandler = (et) => {
    if (document.getElementById('customContactUs').value == 'Yes' || document.getElementById('customContactUs').value == 'yes') {
        //customer button
        let callButtonDiv = document.createElement('div');
        callButtonDiv.innerHTML = `    <a class="callButton customButton call-button">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="350" height="350" viewBox="0 0 350 350" xml:space="preserve">
            <desc>Created with Fabric.js 1.7.22</desc>
            <defs>
            </defs>
            <g id="icon" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-1.9444444444444287 -1.9444444444444287) scale(3.89 3.89)">
                <path d="M 38.789 51.211 l 10.876 10.876 c 0.974 0.974 2.471 1.194 3.684 0.543 l 13.034 -6.997 c 0.964 -0.518 2.129 -0.493 3.07 0.066 l 19.017 11.285 c 1.357 0.805 1.903 2.489 1.268 3.933 c -1.625 3.698 -4.583 10.476 -5.758 13.473 c -0.247 0.631 -0.615 1.209 -1.127 1.652 c -12.674 10.986 -37.89 -2.4 -57.191 -21.701 C 6.358 45.039 -7.028 19.823 3.958 7.149 c 0.444 -0.512 1.022 -0.88 1.652 -1.127 c 2.996 -1.175 9.775 -4.133 13.473 -5.758 c 1.444 -0.635 3.128 -0.089 3.933 1.268 l 11.285 19.017 c 0.558 0.941 0.583 2.106 0.066 3.07 L 27.37 36.651 c -0.651 1.213 -0.431 2.71 0.543 3.684 C 27.913 40.335 38.789 51.211 38.789 51.211 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" class="svgPath" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
            </g>
        </svg>
        <span class="bPhoneNumber">+9714</span>
    </a>`;

        document.getElementById('lp-pom-root').appendChild(callButtonDiv);
    }
    const callButtons = document.querySelectorAll('.call-button');

    let heroNumber = `${document.getElementById('countryCode').value}${document.getElementById('heroNumber').value}`;

    if (callButtons.length > 0) {
        const XYZ = getUrlVars()["IET"];
        if (!heroNumber || heroNumber == '') {
            alert(`No heroNumber found, please add a heroNumber field and value to complete the LP's setup`);
        }

        if (getUrlVars()["IET"] !== undefined) {
            heroNumber = `${document.getElementById('countryCode').value}${XYZ}`;
        }

        for (let callButton of callButtons) {
            //Change tracking phone number
            callButton.href = `clkn/tel/00${heroNumber}`;
            //Change call to action and tracking phone number
            if (callButton.classList.contains('customButton')) {
                document.querySelector('.bPhoneNumber').innerHTML = `+${heroNumber}`
            } else if (!callButton.classList.contains('contact-us')) {
                callButton.innerHTML = `<span class="label" style="Top: 50%; position: absolute; direction: ltr !important;"><strong>+${heroNumber}</strong></span>`;
            }
        }
    }
}

const whatsappLoader = (language) => {

    /* zapier webhook */
    const webHook = document.getElementById('zapierwh').value;

    /* Enter the client's whatsapp number with this format +971501234567 */
    const waPhoneNumber = document.getElementById('whatsapp').value;

    if (webHook == '' || webHook == undefined) {
        return
    }
    const tl = gsap.timeline({
        defaults: {
            ease: "power1.out"
        }
    });
    let whatsappDiv = document.createElement('div');
    if (language == 'arabic' || language == 'Arabic') {
        whatsappDiv.innerHTML = `<div class="waContainer">
        <div class="waHeader"><span>تواصل معنا الآن</span></div>
        <div class="waClose">
          <svg class="svg-icon" viewBox="0 0 20 20">
            <path fill="none"
              d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z">
            </path>
          </svg>
          </svg>
        
        </div>
        <div class="waInnerContainer"></div>
        <div class="waInnerContainerBG">
        
        </div>
        <div class="waText" style="text-align: right; color: #000;"><span>مرحبا، كيف يمكننا مساعدتك</span></div>
            
        <div class="waForm">
        
          <input type="tel" name="Phone Number" id="phoneNumber" placeholder="رقم جوالك">
          <input type="text" name="Message" id="wMessage" placeholder="رسالتك">
        
        </div>
        <div id="sendMessage"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor"
              d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
          </svg></div>
        </div>
        <div class="wa"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333333 333333" shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
          <defs>
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="278113" y1="-12693.3" x2="55219.7" y2="346026">
              <stop offset="0" stop-color="#5dd069"></stop>
              <stop offset="1" stop-color="#2bb641"></stop>
            </linearGradient>
          </defs>
          <path
            d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm63085 107282c-15665-15699-36503-24333-58696-24333-45718-1-82928 37213-82928 82964 0 14614 3828 28909 11081 41469l-11776 43001 43984-11543c12130 6608 25776 10109 39627 10109h33c45720 0 82963-37213 82963-82963 0-22175-8634-43001-24300-58694l12-12zm-58672 127669c-12391 0-24528-3339-35117-9620l-2525-1507-26100 6835 6970-25441-1633-2613c-6939-10958-10561-23642-10561-36687 0-38029 30935-68976 69003-68976 18407 0 35750 7198 48759 20206 13015 13049 20173 30351 20173 48790-31 38056-30965 69003-68975 69003l6 10zm37804-51665c-2061-1049-12265-6048-14160-6740-1894-691-3274-1049-4679 1048-1372 2060-5359 6740-6574 8139-1215 1375-2417 1571-4476 522-2061-1049-8767-3235-16677-10300-6153-5491-10326-12293-11539-14353-1214-2060-136-3204 920-4215 953-923 2063-2416 3108-3631 1049-1214 1375-2063 2063-3465 691-1375 354-2590-167-3632-522-1045-4679-11249-6373-15407-1664-4062-3401-3496-4677-3566-1214-62-2589-62-3958-62-1368 0-3631 520-5525 2585-1894 2061-7261 7098-7261 17299 0 10205 7422 20047 8464 21453 1048 1371 14620 22332 35412 31301 4941 2124 8800 3400 11807 4387 4972 1568 9482 1342 13049 815 3987-587 12265-5006 14002-9848 1735-4845 1735-8990 1215-9847-492-923-1864-1433-3957-2494l-15 13h-1z"
            fill="url(#a)"></path>
        </svg></div>`;
    } else {
        whatsappDiv.innerHTML = `<div class="waContainer">
        <div class="waHeader"><span>Contact us now!</span></div>
        <div class="waClose">
          <svg class="svg-icon" viewBox="0 0 20 20">
            <path fill="none"
              d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z">
            </path>
          </svg>
          </svg>
        
        </div>
        <div class="waInnerContainer"></div>
        <div class="waInnerContainerBG">
        
        </div>
        <div class="waText" style="text-align: left; color: black;"><span>Hi, How can we help you?</span></div>
        
        
        <div class="waForm">
        
          <input type="tel" name="Phone Number" id="phoneNumber" placeholder="Phone Number">
          <input type="text" name="Message" id="wMessage" placeholder="Message">
        
        </div>
        <div id="sendMessage"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor"
              d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
          </svg></div>
        </div>
        <div class="wa"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333333 333333" shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
          <defs>
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="278113" y1="-12693.3" x2="55219.7" y2="346026">
              <stop offset="0" stop-color="#5dd069"></stop>
              <stop offset="1" stop-color="#2bb641"></stop>
            </linearGradient>
          </defs>
          <path
            d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm63085 107282c-15665-15699-36503-24333-58696-24333-45718-1-82928 37213-82928 82964 0 14614 3828 28909 11081 41469l-11776 43001 43984-11543c12130 6608 25776 10109 39627 10109h33c45720 0 82963-37213 82963-82963 0-22175-8634-43001-24300-58694l12-12zm-58672 127669c-12391 0-24528-3339-35117-9620l-2525-1507-26100 6835 6970-25441-1633-2613c-6939-10958-10561-23642-10561-36687 0-38029 30935-68976 69003-68976 18407 0 35750 7198 48759 20206 13015 13049 20173 30351 20173 48790-31 38056-30965 69003-68975 69003l6 10zm37804-51665c-2061-1049-12265-6048-14160-6740-1894-691-3274-1049-4679 1048-1372 2060-5359 6740-6574 8139-1215 1375-2417 1571-4476 522-2061-1049-8767-3235-16677-10300-6153-5491-10326-12293-11539-14353-1214-2060-136-3204 920-4215 953-923 2063-2416 3108-3631 1049-1214 1375-2063 2063-3465 691-1375 354-2590-167-3632-522-1045-4679-11249-6373-15407-1664-4062-3401-3496-4677-3566-1214-62-2589-62-3958-62-1368 0-3631 520-5525 2585-1894 2061-7261 7098-7261 17299 0 10205 7422 20047 8464 21453 1048 1371 14620 22332 35412 31301 4941 2124 8800 3400 11807 4387 4972 1568 9482 1342 13049 815 3987-587 12265-5006 14002-9848 1735-4845 1735-8990 1215-9847-492-923-1864-1433-3957-2494l-15 13h-1z"
            fill="url(#a)"></path>
        </svg></div>`;
    }


    document.getElementById('lp-pom-root').appendChild(whatsappDiv);
    let wa = document.querySelector('.wa');
    let waClose = document.querySelector('.waClose');


    setTimeout(() => {
        tl.to(".wa", {
            scale: 1,
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "back.out(2)"
        })
    }, 3000)
    wa.addEventListener('click', () => {
        tl.to(".wa", {
            scale: 0,
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "elastic.out(1.75, 1)"
        });
        tl.to(".waContainer", {
            y: "0%",
            duration: 1,
            ease: Back.easeOut.config(1.7),
            stagger: 0.5
        }, "-=1");

    })

    waClose.addEventListener('click', () => {
        tl.to(".waContainer", {
            y: "200%",
            duration: 1,
            ease: Back.easeOut.config(1.7),
            stagger: 0.5
        });
        tl.to(".wa", {
            scale: 1,
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "back.out(2)"
        })
    })

    document.getElementById('sendMessage').addEventListener("click", () => {
        let phoneNumber = document.getElementById('phoneNumber').value;
        let message = document.getElementById('wMessage').value;
        let channelId = document.getElementById('channel_id').value;
        let channelName = document.getElementById('channel_name').value;
        let campaignName = document.getElementById('utm_campaign').value;
        let platformCampaign = document.getElementById('campaign_name').value;
        let platformSource = document.getElementById('site_source_name').value;
        let adName = document.getElementById('ad_name').value;
        let adsetName = document.getElementById('adset_name').value;
        let country = document.getElementById('country').value;
        let city = document.getElementById('city').value;
        let googleGCLID = document.getElementById('gclid').value;
        if (/^(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$/.test(phoneNumber)) {
            let countryCode = document.getElementById('countryCode').value.substring(0, 3);
            let formData = new FormData();
            formData.append("name", `name 00${countryCode}${phoneNumber}`);
            formData.append("phone_number", `00${countryCode}${phoneNumber}`);
            formData.append("email", `00${countryCode}${phoneNumber}@whatsapplead.com`);
            formData.append("message", `${message}`);
            formData.append("channel_id", `${channelId}`);
            formData.append("channel_name", `${channelName}`);
            formData.append("Source", 'Whatsapp');
            formData.append("campaign_name", `${campaignName}`);
            formData.append("ad_name", `${adName}`);
            formData.append("adset_name", `${adsetName}`);
            formData.append("source_platform", `${platformSource}`);
            formData.append("campaign_platform", `${platformCampaign}`);
            formData.append("country", `${country}`);
            formData.append("city", `${city}`);
            formData.append("gclid", `${googleGCLID}`);
            let response = fetch(webHook, {
                method: 'POST',
                body: formData
            });
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
                // true for mobile device
                window.open(`https://api.whatsapp.com/send?phone=${waPhoneNumber}&text=${message}`);
            } else {
                // false for not mobile device
                window.open(`https://web.whatsapp.com/send?phone=${waPhoneNumber}&text=${message}`);

            }
            dataLayer.push({ 'event': 'lead' });
        } else {
            alert('Please enter a valid phone number the last 9 digits of your phone number e.g. 501234567')
        }
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    const lpLanguage = document.getElementById('lpLanguage').value;
    messagePH(lpLanguage);

    fixedHeader(1);

    //smooth scroll
    document.querySelector('html').style.scrollBehavior = 'smooth';

    callButtonHandler(1);

    let thisYear = document.getElementById('thisYear');
    if (thisYear) {
        const getYear = new Date().getFullYear();
        thisYear.innerHTML = getYear;
    }
    whatsappLoader(lpLanguage);
});
