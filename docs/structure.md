# File structure and architectre design 


.
├── Nginx
│   └── nginx.config
├── README.md
├── admin
│   ├── Admin_Blueprint.pdf
│   ├── README.md
│   ├── deploy
│   ├── dist
│   │   ├── assets
│   │   │   ├── index-D86vuedU.css
│   │   │   └── index-jU6VZJvN.js
│   │   ├── index.html
│   │   ├── logo.png
│   │   └── vite.svg
│   ├── eslint.config.js
│   ├── firebase.json
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── logo.png
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── api
│   │   │   └── axiosInstance.ts
│   │   ├── assets
│   │   │   ├── logo.png
│   │   │   └── react.svg
│   │   ├── auth
│   │   │   └── login.tsx
│   │   ├── components
│   │   │   ├── farmer.tsx
│   │   │   ├── finance.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── header.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── livestock.tsx
│   │   │   ├── overview.tsx
│   │   │   ├── report.tsx
│   │   │   └── sideview.tsx
│   │   ├── index.css
│   │   ├── main
│   │   │   └── Dashboard.tsx
│   │   ├── main.tsx
│   │   └── utils
│   │       └── protectRoutes.tsx
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── backend
│   ├── API.py
│   ├── Dockerfile
│   ├── __pycache__
│   │   └── API.cpython-311.pyc
│   ├── alembic
│   │   ├── README
│   │   ├── __pycache__
│   │   │   └── env.cpython-311.pyc
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions
│   │       ├── 01b74227e0ba_update_on_livestock_added_more_columns.py
│   │       ├── 07970726dd53_fixed_import_error_at_payment_table.py
│   │       ├── 0d87485d5f87_create_users_table.py
│   │       ├── 0db673ff154d_table_upate_for_notification_and_.py
│   │       ├── 245e23b50962_livestock_table.py
│   │       ├── 3176c9d8326f_unique_querying_for_performance_email_.py
│   │       ├── 4bacd3bc81ab_updated_users_table.py
│   │       ├── 5554d1425f0e_tables_for_reports.py
│   │       ├── 5ddb2b5a0086_product_tables.py
│   │       ├── 63f861eaabba_updates_livestock_coluns.py
│   │       ├── 6bf074e7b082_feeds_table.py
│   │       ├── 759dae82dd81_payment_table_update.py
│   │       ├── 982b29aafd11_tables.py
│   │       ├── 986e6425211d_add_is_verified_to_subscribers.py
│   │       ├── __pycache__
│   │       │   ├── 01b74227e0ba_update_on_livestock_added_more_columns.cpython-311.pyc
│   │       │   ├── 07970726dd53_fixed_import_error_at_payment_table.cpython-311.pyc
│   │       │   ├── 0d87485d5f87_create_users_table.cpython-311.pyc
│   │       │   ├── 0db673ff154d_table_upate_for_notification_and_.cpython-311.pyc
│   │       │   ├── 245e23b50962_livestock_table.cpython-311.pyc
│   │       │   ├── 31545d5f0be7_payment_table_update.cpython-311.pyc
│   │       │   ├── 3176c9d8326f_unique_querying_for_performance_email_.cpython-311.pyc
│   │       │   ├── 40301242f146_payment_table_update.cpython-311.pyc
│   │       │   ├── 4bacd3bc81ab_updated_users_table.cpython-311.pyc
│   │       │   ├── 5554d1425f0e_tables_for_reports.cpython-311.pyc
│   │       │   ├── 5ddb2b5a0086_product_tables.cpython-311.pyc
│   │       │   ├── 63f861eaabba_updates_livestock_coluns.cpython-311.pyc
│   │       │   ├── 6bf074e7b082_feeds_table.cpython-311.pyc
│   │       │   ├── 759dae82dd81_payment_table_update.cpython-311.pyc
│   │       │   ├── 7c621e1ca7fe_first_migration.cpython-311.pyc
│   │       │   ├── 982b29aafd11_tables.cpython-311.pyc
│   │       │   ├── 986e6425211d_add_is_verified_to_subscribers.cpython-311.pyc
│   │       │   ├── aad09c0a1d2d_tab_le_admin.cpython-311.pyc
│   │       │   ├── b4f2bd02e94d_tables_livestock.cpython-311.pyc
│   │       │   ├── b9826ca97d09_payment_table_and_financial_wallet.cpython-311.pyc
│   │       │   ├── d880fbc4e06a_fixed_import_error_at_payment_table.cpython-311.pyc
│   │       │   ├── da32c570ac13_initial.cpython-311.pyc
│   │       │   ├── e87e0c6dac6f_create_user_table.cpython-311.pyc
│   │       │   ├── f52b2554614c_livestock_table_new_columns.cpython-311.pyc
│   │       │   └── f906008aff56_tables_update.cpython-311.pyc
│   │       ├── aad09c0a1d2d_tab_le_admin.py
│   │       ├── b4f2bd02e94d_tables_livestock.py
│   │       ├── b9826ca97d09_payment_table_and_financial_wallet.py
│   │       ├── d880fbc4e06a_fixed_import_error_at_payment_table.py
│   │       ├── da32c570ac13_initial.py
│   │       ├── f52b2554614c_livestock_table_new_columns.py
│   │       └── f906008aff56_tables_update.py
│   ├── alembic.ini
│   ├── config
│   │   ├── __pycache__
│   │   │   ├── database.cpython-311.pyc
│   │   │   ├── lifespan.cpython-311.pyc
│   │   │   ├── logger.cpython-311.pyc
│   │   │   ├── middleware.cpython-311.pyc
│   │   │   ├── security.cpython-311.pyc
│   │   │   └── setting.cpython-311.pyc
│   │   ├── audit
│   │   │   ├── __pycache__
│   │   │   │   ├── context.cpython-311.pyc
│   │   │   │   └── logger.cpython-311.pyc
│   │   │   ├── context.py
│   │   │   ├── logger.py
│   │   │   └── middleware
│   │   │       ├── __pycache__
│   │   │       │   ├── error.cpython-311.pyc
│   │   │       │   ├── logging.cpython-311.pyc
│   │   │       │   ├── performance.cpython-311.pyc
│   │   │       │   ├── request_id.cpython-311.pyc
│   │   │       │   └── security.cpython-311.pyc
│   │   │       ├── error.py
│   │   │       ├── logging.py
│   │   │       ├── performance.py
│   │   │       ├── request_id.py
│   │   │       └── security.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── lifespan.py
│   │   ├── middleware.py
│   │   ├── redis
│   │   │   ├── __pycache__
│   │   │   │   └── client.cpython-311.pyc
│   │   │   ├── cache.py
│   │   │   ├── client.py
│   │   │   └── keys.py
│   │   ├── security.py
│   │   └── setting.py
│  
│   ├── hooks
│   │   ├── __pycache__
│   │   │   ├── call.cpython-311.pyc
│   │   │   ├── services.cpython-311.pyc
│   │   │   └── tasks.cpython-311.pyc
│   │   ├── call.py
│   │   ├── router.py
│   │   ├── services.py
│   │   └── tasks.py
│   ├── message_broker
│   │   ├── __pycache__
│   │   │   └── config.cpython-311.pyc
│   │   ├── config.py
│   │   ├── dispatch.py
│   │   ├── key.py
│   │   ├── observibility
│   │   │   ├── inspector.py
│   │   │   ├── lifecycle.py
│   │   │   ├── metric.py
│   │   │   └── router.py
│   │   ├── queue.py
│   │   ├── redis.py
│   │   └── status.py
│   ├── middleware
│   │   ├── __pycache__
│   │   │   └── auth.cpython-311.pyc
│   │   ├── admin_auth.py
│   │   └── auth.py
│   ├── modules
│   │   ├── Admins
│   │   │   ├── auth
│   │   │   │   ├── __pycache__
│   │   │   │   │   ├── depedency.cpython-311.pyc
│   │   │   │   │   ├── model.cpython-311.pyc
│   │   │   │   │   ├── repository.cpython-311.pyc
│   │   │   │   │   ├── router.cpython-311.pyc
│   │   │   │   │   ├── schema.cpython-311.pyc
│   │   │   │   │   ├── seed.cpython-311.pyc
│   │   │   │   │   └── service.cpython-311.pyc
│   │   │   │   ├── depedency.py
│   │   │   │   ├── model.py
│   │   │   │   ├── repository.py
│   │   │   │   ├── router.py
│   │   │   │   ├── schema.py
│   │   │   │   ├── seed.py
│   │   │   │   └── service.py
│   │   │   ├── farmers
│   │   │   └── finance
│   │   │       ├── repository.py
│   │   │       ├── router.py
│   │   │       └── service.py
│   │   ├── __init__.py
│   │   ├── __pycache__
│   │   │   └── __init__.cpython-311.pyc
│   │   ├── ai
│   │   │   ├── model.py
│   │   │   ├── pipelines
│   │   │   │   ├── disease_risk.py
│   │   │   │   ├── heat_prediction.py
│   │   │   │   ├── nutrition_optimizer.py
│   │   │   │   └── pregancy_prediction.py
│   │   │   ├── providers
│   │   │   │   ├── gemini.py
│   │   │   │   └── vertex.py
│   │   │   ├── router.py
│   │   │   ├── schema.py
│   │   │   ├── service.py
│   │   │   └── tasks.py
│   │   ├── analytics
│   │   │   ├── __pycache__
│   │   │   │   ├── repository.cpython-311.pyc
│   │   │   │   └── router.cpython-311.pyc
│   │   │   ├── model.py
│   │   │   ├── repository.py
│   │   │   ├── router.py
│   │   │   └── service.py
│   │   ├── auth
│   │   │   ├── __pycache__
│   │   │   │   ├── models.cpython-311.pyc
│   │   │   │   ├── repository.cpython-311.pyc
│   │   │   │   ├── router.cpython-311.pyc
│   │   │   │   ├── schemas.cpython-311.pyc
│   │   │   │   ├── security.cpython-311.pyc
│   │   │   │   └── service.cpython-311.pyc
│   │   │   ├── dependencies.py
│   │   │   ├── models.py
│   │   │   ├── repository.py
│   │   │   ├── router.py
│   │   │   ├── schemas.py
│   │   │   ├── security.py
│   │   │   └── service.py
│   │   ├── farmers
│   │   │   ├── __pycache__
│   │   │   │   ├── repository.cpython-311.pyc
│   │   │   │   ├── router.cpython-311.pyc
│   │   │   │   ├── schemas.cpython-311.pyc
│   │   │   │   └── service.cpython-311.pyc
│   │   │   ├── models.py
│   │   │   ├── repository.py
│   │   │   ├── router.py
│   │   │   ├── schemas.py
│   │   │   └── service.py
│   │   ├── health
│   │   ├── livestock
│   │   │   ├── __pycache__
│   │   │   │   ├── model.cpython-311.pyc
│   │   │   │   ├── repository.cpython-311.pyc
│   │   │   │   ├── router.cpython-311.pyc
│   │   │   │   ├── schema.cpython-311.pyc
│   │   │   │   ├── service.cpython-311.pyc
│   │   │   │   └── tasks.cpython-311.pyc
│   │   │   ├── model.py
│   │   │   ├── repository.py
│   │   │   ├── router.py
│   │   │   ├── schema.py
│   │   │   ├── service.py
│   │   │   └── tasks.py
│   │   ├── notifications
│   │   │   ├── __pycache__
│   │   │   │   ├── model.cpython-311.pyc
│   │   │   │   ├── repository.cpython-311.pyc
│   │   │   │   ├── router.cpython-311.pyc
│   │   │   │   ├── schemas.cpython-311.pyc
│   │   │   │   ├── service.cpython-311.pyc
│   │   │   │   ├── tasks.cpython-311.pyc
│   │   │   │   └── utils.cpython-311.pyc
│   │   │   ├── model.py
│   │   │   ├── providers
│   │   │   │   ├── __pycache__
│   │   │   │   │   ├── email.cpython-311.pyc
│   │   │   │   │   ├── map.cpython-311.pyc
│   │   │   │   │   ├── push.cpython-311.pyc
│   │   │   │   │   └── sms.cpython-311.pyc
│   │   │   │   ├── email.py
│   │   │   │   ├── kai_whatsapp.py
│   │   │   │   ├── map.py
│   │   │   │   ├── push.py
│   │   │   │   └── sms.py
│   │   │   ├── repository.py
│   │   │   ├── router.py
│   │   │   ├── schemas.py
│   │   │   ├── service.py
│   │   │   ├── tasks.py
│   │   │   └── utils.py
│   │   ├── nutrition
│   │   │   ├── __pycache__
│   │   │   │   ├── model.cpython-311.pyc
│   │   │   │   ├── repository.cpython-311.pyc
│   │   │   │   ├── router.cpython-311.pyc
│   │   │   │   ├── schema.cpython-311.pyc
│   │   │   │   ├── service.cpython-311.pyc
│   │   │   │   └── tasks.cpython-311.pyc
│   │   │   ├── model.py
│   │   │   ├── repository.py
│   │   │   ├── router.py
│   │   │   ├── schema.py
│   │   │   ├── service.py
│   │   │   └── tasks.py
│   │   ├── payments
│   │   │   ├── __pycache__
│   │   │   │   ├── model.cpython-311.pyc
│   │   │   │   ├── repository.cpython-311.pyc
│   │   │   │   ├── router.cpython-311.pyc
│   │   │   │   ├── schema.cpython-311.pyc
│   │   │   │   └── service.cpython-311.pyc
│   │   │   ├── model.py
│   │   │   ├── repository.py
│   │   │   ├── router.py
│   │   │   ├── schema.py
│   │   │   ├── service.py
│   │   │   └── tasks.py
│   │   ├── reports
│   │   │   ├── __pycache__
│   │   │   │   ├── model.cpython-311.pyc
│   │   │   │   ├── repository.cpython-311.pyc
│   │   │   │   ├── router.cpython-311.pyc
│   │   │   │   ├── schema.cpython-311.pyc
│   │   │   │   └── service.cpython-311.pyc
│   │   │   ├── model.py
│   │   │   ├── repository.py
│   │   │   ├── router.py
│   │   │   ├── schema.py
│   │   │   ├── service.py
│   │   │   ├── templates
│   │   │   │   ├── financial_report.html
│   │   │   │   └── payment_receipt.html
│   │   │   └── utils
│   │   │       ├── __pycache__
│   │   │       │   └── gen_pay.cpython-311.pyc
│   │   │       └── gen_pay.py
│   │   └── reproduction
│   │       ├── __pycache__
│   │       │   ├── model.cpython-311.pyc
│   │       │   ├── repository.cpython-311.pyc
│   │       │   ├── router.cpython-311.pyc
│   │       │   ├── schema.cpython-311.pyc
│   │       │   └── service.cpython-311.pyc
│   │       ├── model.py
│   │       ├── repository.py
│   │       ├── router.py
│   │       ├── schema.py
│   │       └── service.py
│   ├── pyproject.toml
│   ├── requirements.txt
│   ├── tests
│   │   ├── ApI
│   │   ├── E2E
│   │   ├── __pycache__
│   │   │   ├── test_main.cpython-311-pytest-7.4.0.pyc
│   │   │   └── test_main.cpython-311-pytest-8.4.1.pyc
│   │   ├── integration
│   │   ├── test_main.py
│   │   └── unit
│   │       └── auth
│   │           └── test.unit.auth.py
│   ├── utils
│   │   ├── Kai_whatsappSend.py
│   │   ├── __pycache__
│   │   │   ├── hashing.cpython-311.pyc
│   │   │   ├── jwt.cpython-311.pyc
│   │   │   ├── otp.cpython-311.pyc
│   │   │   └── sendOtpEmail.cpython-311.pyc
│   │   ├── hashing.py
│   │   ├── jwt.py
│   │   ├── otp.py
│   │   └── sendOtpEmail.py
│   └── worker
│       ├── __init__.py
│       ├── __pycache__
│       │   ├── __init__.cpython-311.pyc
│       │   ├── beat.cpython-311.pyc
│       │   ├── celery_app.cpython-311.pyc
│       │   ├── celery_config.cpython-311.pyc
│       │   └── models.cpython-311.pyc
│       ├── beat.py
│       ├── celery_app.py
│       ├── celery_config.py
│       └── models.py
├── backend_node
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── deploy
├── docker-compose.yml
├── docs
|   ├── structure.md
│   ├── PRD.md
│   ├── decision.md
│   └── roadmap.md
├── frontend
│   ├── Dockerfile
│   ├── README.md
│   ├── biome.json
│   ├── deploy
│   ├── eslint.config.mjs
│   ├── firebase.json
│   ├── next-env.d.ts
│   ├── next-pwa.d.ts
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── postcss.config.mjs
│   ├── public
│   │   ├── 1c.mp4
│   │   ├── 404.html
│   │   ├── Agri1.jpg
│   │   ├── Agri3.jpg
│   │   ├── Agri4.jpg
│   │   ├── Agri5.png
│   │   ├── Agri7.jpg
│   │   ├── AgriDoc.png
│   │   ├── C2.mp4
│   │   ├── _.jpeg
│   │   ├── agri2.jpg
│   │   ├── agri_cow.jpg
│   │   ├── background.mp4
│   │   ├── c.jpg
│   │   ├── c11.jpg
│   │   ├── calf.jpg
│   │   ├── calf2.jpg
│   │   ├── cow12.jpg
│   │   ├── cow2.jpg
│   │   ├── cow3.jpg
│   │   ├── cowface.jpg
│   │   ├── cowsInShelter.jpg
│   │   ├── farmer1.jpg
│   │   ├── farmer2.jpg
│   │   ├── farmer3.jpg
│   │   ├── farmer4.jpg
│   │   ├── farmer5.jpg
│   │   ├── farmer6.jpg
│   │   ├── file.svg
│   │   ├── gaot.jpg
│   │   ├── globe.svg
│   │   ├── googleece2ce60d21b0635.html
│   │   ├── index.html
│   │   ├── log1.jpeg
│   │   ├── logo.png
│   │   ├── logo1.png
│   │   ├── manifest.json
│   │   ├── milk.jpeg
│   │   ├── milking.jpg
│   │   ├── next.svg
│   │   ├── sw.js
│   │   ├── sw.js.map
│   │   ├── vercel.svg
│   │   ├── window.svg
│   │   ├── workbox-e43f5367.js
│   │   └── workbox-e43f5367.js.map
│   ├── src
│   │   └── app
│   │       ├── API
│   │       │   ├── axiosInstance.ts
│   │       │   └── serverAPI.ts
│   │       ├── __test__
│   │       │   └── login.test.tsx
│   │       ├── actions
│   │       │   ├── livestock.ts
│   │       │   └── reportApi.ts
│   │       ├── auth
│   │       │   ├── login
│   │       │   │   └── page.tsx
│   │       │   ├── register
│   │       │   │   └── page.tsx
│   │       │   ├── reset-password
│   │       │   │   └── page.tsx
│   │       │   └── verification
│   │       │       └── page.tsx
│   │       ├── components
│   │       │   ├── AiInsights.tsx
│   │       │   ├── FarmAnalytics.tsx
│   │       │   ├── FarmerGallery.tsx
│   │       │   ├── FarmerInput.tsx
│   │       │   ├── FeedStockPage
│   │       │   │   ├── Feed.tsx
│   │       │   │   ├── FeedInventory.tsx
│   │       │   │   ├── addFeed.tsx
│   │       │   │   └── feedSummary.tsx
│   │       │   ├── alerts.tsx
│   │       │   ├── analytics
│   │       │   │   ├── KPIGrid.tsx
│   │       │   │   ├── analysis.tsx
│   │       │   │   ├── effeciency.tsx
│   │       │   │   ├── performance.tsx
│   │       │   │   ├── productionTrendChart.tsx
│   │       │   │   └── statsHead.tsx
│   │       │   ├── contact.tsx
│   │       │   ├── farmdata
│   │       │   │   └── tabs.tsx
│   │       │   ├── footer.tsx
│   │       │   ├── footerHome.tsx
│   │       │   ├── guard.tsx
│   │       │   ├── header.tsx
│   │       │   ├── headerHomepage.tsx
│   │       │   ├── homepagepowered.tsx
│   │       │   ├── layout.tsx
│   │       │   ├── learningHub.tsx
│   │       │   ├── livestock
│   │       │   │   ├── DetailAnimal.tsx
│   │       │   │   ├── ListAnimals.tsx
│   │       │   │   ├── RegisterAnimals.tsx
│   │       │   │   ├── animal_update.tsx
│   │       │   │   └── overviewAnimals.tsx
│   │       │   ├── milkProduction
│   │       │   │   ├── dataInput.tsx
│   │       │   │   ├── milk.tsx
│   │       │   │   └── milkData.tsx
│   │       │   ├── notification.tsx
│   │       │   ├── overview.tsx
│   │       │   ├── packages.tsx
│   │       │   ├── profile.tsx
│   │       │   ├── report
│   │       │   │   ├── DateRangePicker.tsx
│   │       │   │   ├── ReportCard.tsx
│   │       │   │   ├── financialSummary.tsx
│   │       │   │   ├── financialTable.tsx
│   │       │   │   ├── report.tsx
│   │       │   │   └── tabs.tsx
│   │       │   ├── reports.tsx
│   │       │   ├── service.tsx
│   │       │   ├── sidebar.tsx
│   │       │   └── wrapper.tsx
│   │       ├── dash
│   │       │   └── page.tsx
│   │       ├── dashboard
│   │       │   └── page.tsx
│   │       ├── favicon.ico
│   │       ├── globals.css
│   │       ├── hooks
│   │       │   ├── analyticAPICalls.ts
│   │       │   └── mobile.tsx
│   │       ├── layout.tsx
│   │       ├── lib
│   │       │   ├── auth
│   │       │   │   └── cookie.ts
│   │       │   ├── context
│   │       │   │   ├── context.tsx
│   │       │   │   └── hook.tsx
│   │       │   ├── firebase.ts
│   │       │   ├── firebaseProvider.tsx
│   │       │   ├── flag.ts
│   │       │   └── providers
│   │       │       ├── tan-stack.tsx
│   │       │       └── theme.tsx
│   │       ├── livestock
│   │       ├── middleware
│   │       ├── page
│   │       │   └── page.tsx
│   │       ├── page.tsx
│   │       ├── payment
│   │       │   ├── mpesa.tsx
│   │       │   ├── planStatus.tsx
│   │       │   └── subscriptions.tsx
│   │       ├── services
│   │       │   └── livestock.ts
│   │       ├── store
│   │       │   └── tab.ts
│   │       └── types
│   │           ├── animalOverview.tsx
│   │           ├── dairy.ts
│   │           ├── feed.ts
│   │           ├── livestock.ts
│   │           └── report.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── k8s
└── render.yaml




## API endpoint design 

FastAPI
│
├── CORSMiddleware
│      Allowed Origins
│      Allowed Methods
│      Allowed Headers
│
├── GZipMiddleware
│
├── Security Middleware
├── Logging Middleware
├── Request ID Middleware
├── Error Middleware
│
├── Rate Limiter (Redis)
│
├── Redis Cache
│
├── Redis Queue
│      └── Celery
│
└── PostgreSQL