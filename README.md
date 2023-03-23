# prjctX

A community management system and tools for art collectors.

The project consists of:
- Front-end: Progessive web app (PWA) built with [Bubblewrap][bubblewrap], Bootstrap v[5.3.0-alpha1][bootstrap], Handlebars v[4.7.7][handlebars]
- Back-end: RESTful API built with Slim Framework v[4.11.0][slim], PHP v[8.1.2][php], and MariaDB v[10.6.12][mariadb].

```bash
$ composer show --direct 
selective/basepath 2.1.0  A URL base path detector for Slim 4
slim/psr7          1.6    Strict PSR-7 implementation
slim/slim          4.11.0 Slim is a PHP micro framework that helps you quickly write simple yet powerful web applications and APIs
```

## Local development:

```bash
# Start PHP built-in web server to run an API
cd ./core/apis/v1/collectors/ && sudo php -S localhost:8888 -t public public/index.php
cd /home/sabuein/my/projects/prjctX/core/apis/v1/collectors/ && sudo php -S localhost:8888 -t public public/index.php
```

### Web resources:

- Progressive web apps (PWAs) ([MDN][pwamdn], [web.dev][pwaweb], [Microsoft][mspwa])
- Service Worker API ([MDN][servicemdn])
- Fetch API ([WHATWG][fetchwhat], [MDN][fetchmdn], [web.dev][fetchweb])
- Credential Management API ([MDN][creapimdn], [web.dev][creapiweb])
- Payment Request API ([W3C][payw3c], [MDN][paymdn], [web.dev][payweb], [Apple][payapple], [freeCodeCamp][payfreecode])
- Google Pay API ([Google][paygoogle])
- Stripe's payments APIs ([Payments][stripeapis], [CLI][stripcli], [SDK][stripephp])
- Web Bluetooth API ([W3C project on GitHub][btw3c], [MDN][btmdn])
- Notifications API ([MDN][notifimdn])
- Push API ([MDN][pushmdn], [Mozilla's Push Service][mozillapush], [Data Encryption Test Page][pushdatatest])
- Cache ([MDN][cachemdn])
- Performance API ([MDN][performdn])
- Web Storage API ([MDN][storagemdn])

### PHP resources:

- [rfc:request_response][rfc_rr]
- [PSR-4: Autoloader][psr4]
- [PSR-7: HTTP message interfaces][psr7]
- [PSR-15: HTTP Server Request Handlers][psr15]

[slim]: https://www.slimframework.com/2022/11/06/slim-4.11.0-release.html "Slim 4.11.0 released - Slim Framework"
[php]: https://www.php.net/releases/8_1_2.php "PHP: PHP 8.1.2 Release Announcement"
[mariadb]: https://mariadb.com/kb/en/mariadb-10-6-12-release-notes/ "MariaDB 10.6.12 Release Notes - MariaDB Knowledge Base"
[psr4]: https://www.php-fig.org/psr/psr-4/ "PSR-4: Autoloader - PHP-FIG"
[psr7]: https://www.php-fig.org/psr/psr-7/ "PSR-7: HTTP message interfaces - PHP-FIG"
[psr15]: https://www.php-fig.org/psr/psr-15/ "PSR-15: HTTP Server Request Handlers - PHP-FIG"
[fetchwhat]: https://fetch.spec.whatwg.org/ "Fetch Standard"
[fetchmdn]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API "Fetch API - Web APIs | MDN"
[fetchweb]: https://web.dev/introduction-to-fetch/ "Introduction to fetch()"
[creapimdn]: https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API "Credential Management API - Web APIs | MDN"
[creapiweb]: https://web.dev/security-credential-management/ "The Credential Management API"
[payw3c]: https://www.w3.org/TR/payment-request/ "Payment Request API"
[paymdn]: https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API "Payment Request API - Web APIs | MDN"
[payweb]: https://web.dev/how-payment-request-api-works/ "How Payment Request API works"
[payapple]: https://developer.apple.com/documentation/apple_pay_on_the_web/payment_request_api "Payment Request API | Apple Developer Documentation"
[stripeapis]: https://stripe.com/docs/payments/online-payments "Get started with Stripe APIs | Stripe Documentation"
[stripcli]: https://stripe.com/docs/stripe-cli/overview "Stripe CLI | Stripe Documentation"
[stripephp]: https://github.com/stripe/stripe-php "stripe/stripe-php: PHP library for the Stripe API"
[paygoogle]: https://developers.google.com/pay/api/web/overview "Overview  |  Google Pay API  |  Google Developers"
[payfreecode]: https://www.freecodecamp.org/news/payment-request-api-javascript/ "How to Use the Payment Request API in JavaScript"
[rfc_rr]: https://wiki.php.net/rfc/request_response "PHP: rfc:request_response"
[bootstrap]: https://getbootstrap.com/docs/5.3/getting-started/introduction/ "Get started with Bootstrap · Bootstrap v5.3"
[btmdn]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API "Web Bluetooth API - Web APIs | MDN"
[btw3c]: https://github.com/WebBluetoothCG/web-bluetooth "WebBluetoothCG/web-bluetooth: Bluetooth support for the Web."
[pwamdn]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps "Progressive web apps (PWAs) | MDN"
[pwaweb]: https://web.dev/progressive-web-apps/ "Progressive Web Apps - web.dev"
[pushmdn]: https://developer.mozilla.org/en-US/docs/Web/API/Push_API "Push API - Web APIs | MDN"
[notifimdn]: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API "Notifications API - Web APIs | MDN"
[servicemdn]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API "Service Worker API"
[pushdatatest]: https://jrconlin.github.io/WebPushDataTestPage/ "Web Push: Data Encryption Test Page"
[cachemdn]: https://developer.mozilla.org/en-US/docs/Web/API/Cache "Cache - Web APIs | MDN"
[mozillapush]: https://blog.mozilla.org/services/2016/08/23/sending-vapid-identified-webpush-notifications-via-mozillas-push-service/ "Sending VAPID identified WebPush Notifications via Mozilla’s Push Service | Mozilla Services"
[mspwa]: https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/ "Overview of Progressive Web Apps (PWAs) - Microsoft Edge Development | Microsoft Learn"
[performdn]: https://developer.mozilla.org/en-US/docs/Web/API/Performance_API "Performance API - Web APIs | MDN"
[storagemdn]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API "Web Storage API - Web APIs | MDN"
[handlebars]: https://handlebarsjs.com/installation/#downloading-handlebars "Handlebars"
[bubblewrap]: https://github.com/GoogleChromeLabs/bubblewrap "GoogleChromeLabs/bubblewrap: Bubblewrap is a Command Line Interface (CLI) that helps developers to create a Project for an Android application that launches an existing Progressive Web App (PWAs) using a Trusted Web Activity."