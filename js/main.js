/**
 * ForYouPack — Main JavaScript
 * Phase 1: Language toggle, Theme toggle, Header scroll behavior, Mobile menu
 */

(function () {
  'use strict';

  /* ============================================================
     CONSTANTS
     ============================================================ */
  const THEME_KEY = 'fyp-theme';
  const LANG_KEY  = 'fyp-lang';

  const DEFAULT_THEME = 'dark';
  const DEFAULT_LANG  = 'ar';

  /* ============================================================
     TRANSLATIONS — Phase 1 (Header + Hero)
     (All site text in both languages)
     ============================================================ */
  const translations = {
    en: {
      /* Meta */
      pageTitle:         'ForYouPack — The Right Box, At The Right Time',
      metaDesc:          'ForYouPack is a leading Egyptian manufacturer of corrugated cardboard cartons for industrial packaging. Serving food, water, agriculture, glass, oil, and cookware industries since 2017.',

      /* Logo */
      logoName:          'ForYouPack',
      logoTagline:       'Industrial Packaging',

      /* Navigation */
      navHome:           'Home',
      navAbout:          'About Us',
      navProducts:       'Products',
      navIndustries:     'Industries',
      navSpecs:          'Specifications',
      navContact:        'Contact',
      navGetQuote:       'Get a Quote',

      /* Hero */
      heroBadge:         'Est. 2017 · Sadat City, Egypt',
      heroHeadline1:     'The Right Box,',
      heroHeadline2:     'At the Right Time',
      heroTaglineName:   'ForYouPack',
      heroTagline:       '… The Right Box… At The Right Time',
      heroDesc:          'Leading manufacturer of corrugated cardboard cartons for industrial packaging. Trusted by food, water, agriculture, glass, oil, and cookware industries across Egypt.',
      heroCta1:          'Request a Quote',
      heroCta2:          'Explore Products',

      /* Stats */
      statYears:         'Years of Experience',
      statIndustries:    'Industries Served',
      statQuality:       'Quality Assured',

      /* Features strip */
      feat1Title:        'Custom Dimensions',
      feat1Desc:         'Production line: 165 × 210 — tailored to your specs',
      feat2Title:        'Multiple Flute Types',
      feat2Desc:         'E, B & C flutes for every strength requirement',
      feat3Title:        'Reliable Supply',
      feat3Desc:         'On-time delivery for industrial-scale orders',
      feat4Title:        'B2B Focused',
      feat4Desc:         'Dedicated to factory and industrial partners',

      /* Hero image */
      heroImgAlt:        '[Image: Factory exterior — ForYouPack production facility]',
      heroCard1Value:    '9+ Years',
      heroCard1Desc:     'Manufacturing Experience',
      heroCard2Value:    'ISO Ready',
      heroCard2Desc:     'Quality Standards',

      /* About */
      aboutBadge:        'Est. 2017 · 9 Years of Experience',
      aboutTitle:        'Your Industrial Packaging Partner Since 2017',
      aboutLead:         'ForYouPack is an Egyptian Limited Liability Company (LLC) specializing in the manufacture of corrugated cardboard cartons for various industries, with over 9 years of experience in Sadat City\'s industrial zone.',
      aboutBody:         'We believe quality packaging is the foundation of product protection and safe delivery to the customer. We use the latest production lines and finest raw materials to deliver products meeting the high industrial specifications required by our factory and corporate clients.',
      aboutH1Title:      'Location',
      aboutH1Desc:       '6th Industrial Zone, Sadat City',
      aboutH2Title:      'Legal Entity',
      aboutH2Desc:       'Limited Liability Company (LLC)',
      aboutH3Title:      'Quality',
      aboutH3Desc:       'High-level industrial specifications',
      aboutH4Title:      'Capacity',
      aboutH4Desc:       'Capable of fulfilling large-scale orders',
      aboutCta:          'Contact Us',
      aboutStat1Num:     '9+',
      aboutStat1Lbl:     'Years of Experience',
      aboutStat2Num:     '6+',
      aboutStat2Lbl:     'Industries Served',

      /* Products */
      productsEyebrow:   'Our Products',
      productsTitle:     'Corrugated Cartons for Every Industrial Need',
      productsSubtitle:  'We manufacture a wide range of corrugated cardboard cartons with custom specifications to meet each client\'s requirements.',
      prod1Tag:          'Single Wall',
      prod1Title:        'Single Wall Corrugated Box',
      prod1Desc:         'Ideal for light to medium-weight products. Provides adequate protection with a cost-effective solution for large-volume production.',
      prod1F1:           'Suitable for light and medium loads',
      prod1F2:           'E or B flute as required',
      prod1F3:           'Custom dimensions to specification',
      prod2Tag:          'Double Wall',
      prod2Title:        'Double Wall Corrugated Box',
      prod2Desc:         'Double resistance to pressure and impact, ideal for heavy products and long-distance shipping or extended storage requirements.',
      prod2F1:           'High resistance to stacking pressure',
      prod2F2:           'Combined B+C flute',
      prod2F3:           'Suitable for heavy storage and shipping',
      prod3Tag:          'Heavy Duty',
      prod3Title:        'Heavy Duty Industrial Box',
      prod3Desc:         'Designed for maximum load bearing in demanding industrial environments. Used by glass, cookware, and heavy goods factories.',
      prod3F1:           'Handles high industrial weights',
      prod3F2:           'Moisture and pressure resistant',
      prod3F3:           'Ideal for glass and cookware factories',
      prod4Tag:          'Die-Cut Custom',
      prod4Title:        'Die-Cut Custom Shape Box',
      prod4Desc:         'Precision cutting and fully custom shapes to client specifications. The perfect solution for non-standard product dimensions.',
      prod4F1:           'Precise custom dimensions and shapes',
      prod4F2:           'Suitable for all product types',
      prod4F3:           'Perfect for non-standard shapes',
      prodCtaLabel:      'Request a Quote',
      productsPricingNote: 'Pricing is not fixed — it depends on specifications and quantities. Contact us for a custom quote tailored to your needs.',
      productsCtaBtn:    'Request a Custom Quote',

      /* Industries */
      industriesEyebrow: 'Our Clients',
      industriesTitle:   'Industries We Serve',
      industriesSubtitle:'We provide specialized packaging solutions for a wide range of Egyptian and regional industries.',
      ind1Title:         'Food Factories',
      ind1Desc:          'Food-safe compliant cartons that withstand humidity and cold temperatures.',
      ind2Title:         'Mineral Water Factories',
      ind2Desc:          'Sturdy packaging for plastic and glass bottles, capable of bearing heavy loads.',
      ind3Title:         'Agricultural Fertilizer Companies',
      ind3Desc:          'Chemical-resistant cartons suitable for large sizes and heavy weights.',
      ind4Title:         'Glass Factories',
      ind4Desc:          'Excellent protective packaging for fragile glass products with custom interior dividers.',
      ind5Title:         'Oil Factories',
      ind5Desc:          'Oil-resistant cartons suitable for oil containers of various sizes.',
      ind6Title:         'Cookware Factories',
      ind6Desc:          'Professional packaging for household cookware ensuring safe delivery to the end consumer.',
      ind7Title:         'Export Terminals',
      ind7Desc:          'We are preparing to expand our services to include export terminals and meet international packaging requirements.',
      indComingSoonBadge:'Coming Soon',

      /* Specifications */
      specsEyebrow:      'Technical Data',
      specsTitle:        'Production & Flute Specifications',
      specsSubtitle:     'Precise technical data needed by industrial buyers to select the right type and strength.',
      specsDimTitle:     'Production Line Dimensions',
      specsDimSub:       'Maximum dimensions of the manufacturing line',
      specsWidthLabel:   'Width',
      specsLengthLabel:  'Length',
      specsDimNote:      'Cartons can be produced in various dimensions within these maximum limits. Contact us to discuss your specific requirements.',
      specsFlutesTitle:  'Flute Types & Coefficients',
      spacesFlutesSub:   'The flute coefficient determines the amount of additional paper used',
      specsFluteTh1:     'Flute Type',
      specsFluteTh2:     'Flute Coefficient',
      specsEFluteName:   'E Flute',
      specsEFluteDesc:   'Fine — for light packaging',
      specsBFluteName:   'B Flute',
      specsBFluteDesc:   'Medium — most commonly used',
      specsCFluteName:   'C Flute',
      specsCFluteDesc:   'Coarse — for heavy loads',
      specsFlutesNote:   'Flute coefficient = ratio of paper used in the flute versus the total carton length. Higher coefficient means greater strength and weight.',

      /* Contact */
      contactEyebrow:    'Get In Touch',
      contactTitle:      'We\'re Here to Answer Your Enquiries',
      contactSubtitle:   'Whether you need a quote or have a technical question, contact us and we\'ll respond promptly.',
      contactPhone1Label:'Primary Phone',
      contactPhone2Label:'Secondary Phone',
      contactPhoneSub:   'Available during business hours',
      contactWaSub:      'Chat with us directly on WhatsApp',
      contactEmailGenLabel: 'General Email',
      contactEmailGenSub:   'For general enquiries',
      contactEmailSalesLabel: 'Sales & Pricing Email',
      contactEmailSalesSub:   'For price quotes and orders',
      contactAddrLabel:  'Address',
      contactAddrValue:  'Plot 2/6276, 6th Industrial Zone',
      contactAddrSub:    'Sadat City, Menofia, Egypt',
      contactMapLabel:   '[Google Maps — Factory location: 6th Industrial Zone, Sadat City]',
      contactMapLink:    'Open in Google Maps',
      contactFormTitle:  'Request a Quote',
      contactFormSub:    'Send us your requirements and we\'ll respond within 24 hours with a tailored quote.',
      formName:          'Full Name',
      formNamePh:        'Your full name',
      formCompany:       'Company / Factory Name',
      formCompanyPh:     'Your company or factory name',
      formPhone:         'Phone Number',
      formPhonePh:       '010XXXXXXXX',
      formIndustry:      'Industry Sector',
      formIndustryDefault: 'Select your sector',
      formInd1:          'Food Factories',
      formInd2:          'Mineral Water Factories',
      formInd3:          'Agricultural Fertilizer Companies',
      formInd4:          'Glass Factories',
      formInd5:          'Oil Factories',
      formInd6:          'Cookware Factories',
      formInd7:          'Other',
      formMessage:       'Order Details',
      formMessagePh:     'Please specify box type, required dimensions, quantities, and any special requirements...',
      formSubmit:        'Send Request',
      formWhatsapp:      'WhatsApp',

      /* Footer */
      footerDesc:        'ForYouPack LLC — A leading Egyptian manufacturer of corrugated cardboard cartons for various industries since 2017. Sadat City, Menofia, Egypt.',
      footerNavTitle:    'Quick Links',
      footerContactTitle:'Contact',
      footerLocationTitle:'Location',
      footerAddress:     'Plot 2/6276\n6th Industrial Zone\nSadat City, Menofia\nEgypt',
      footerCopyright:   '© 2026 ForYouPack — فوريو باك LLC. All rights reserved · جميع الحقوق محفوظة.',
      footerPrivacy:     'Privacy Policy',
      footerTerms:       'Terms & Conditions',

      /* Shared UI labels */
      contactWaLabel:    'WhatsApp',
      footerWaPrefix:    'WhatsApp:',
      waTip:             'Chat on WhatsApp',

      /* Image labels */
      aboutImgLabel:     '[Image: Factory exterior — ForYouPack production facility, Sadat City]',
      prodImgLabel1:     '[Product image: Single Wall Corrugated Box]',
      prodImgLabel2:     '[Product image: Double Wall Corrugated Box]',
      prodImgLabel3:     '[Product image: Heavy Duty Industrial Box]',
      prodImgLabel4:     '[Product image: Die-Cut Custom Shape Box]',
    },

    ar: {
      /* Meta */
      pageTitle:         'فوريو باك — الصندوق الصح في الوقت الصح',
      metaDesc:          'فوريو باك شركة مصرية رائدة في تصنيع كراتين التغليف المموج للتعبئة الصناعية. نخدم صناعات الغذاء والمياه والزراعة والزجاج والزيوت وأواني الطهي منذ عام 2017.',

      /* Logo */
      logoName:          'فوريو باك',
      logoTagline:       'تغليف صناعي',

      /* Navigation */
      navHome:           'الرئيسية',
      navAbout:          'عن الشركة',
      navProducts:       'المنتجات',
      navIndustries:     'الصناعات',
      navSpecs:          'المواصفات',
      navContact:        'اتصل بنا',
      navGetQuote:       'اطلب عرض سعر',

      /* Hero */
      heroBadge:         'تأسست 2017 · مدينة السادات، مصر',
      heroHeadline1:     'الصندوق الصح...',
      heroHeadline2:     'في الوقت الصح',
      heroTaglineName:   'فوريو باك',
      heroTagline:       '... الصندوق الصح... في الوقت الصح',
      heroDesc:          'شركة رائدة في تصنيع كراتين التغليف المموج للتغليف الصناعي. موثوق بها من قِبل مصانع الغذاء والمياه والزراعة والزجاج والزيوت وأواني الطهي في جميع أنحاء مصر.',
      heroCta1:          'اطلب عرض سعر',
      heroCta2:          'استعرض المنتجات',

      /* Stats */
      statYears:         'سنة خبرة',
      statIndustries:    'صناعات نخدمها',
      statQuality:       'جودة مضمونة',

      /* Features strip */
      feat1Title:        'مقاسات مخصصة',
      feat1Desc:         'خط إنتاج: 165 × 210 — وفق مواصفاتك',
      feat2Title:        'أنواع موجات متعددة',
      feat2Desc:         'موجات E و B و C لكل متطلبات المقاومة',
      feat3Title:        'إمداد موثوق',
      feat3Desc:         'تسليم في الموعد لطلبات الحجم الصناعي',
      feat4Title:        'شريك صناعي',
      feat4Desc:         'متخصصون في خدمة المصانع والشركاء الصناعيين',

      /* Hero image */
      heroImgAlt:        '[صورة: المصنع — مرفق إنتاج فوريو باك]',
      heroCard1Value:    '+9 سنوات',
      heroCard1Desc:     'خبرة في التصنيع',
      heroCard2Value:    'جاهز للمعايير',
      heroCard2Desc:     'ضمان الجودة',

      /* About */
      aboutBadge:        'تأسست عام 2017 · 9 سنوات خبرة',
      aboutTitle:        'شركاؤكم في التغليف الصناعي منذ 2017',
      aboutLead:         'فوريو باك شركة مصرية ذات مسئولية محدودة متخصصة في تصنيع كراتين التغليف المموج للصناعات المختلفة، بخبرة تمتد لأكثر من 9 سنوات في قلب المنطقة الصناعية بمدينة السادات.',
      aboutBody:         'نؤمن بأن التغليف الجيد هو أساس حماية المنتج ووصوله سليمًا إلى العميل. لذلك نستخدم أحدث خطوط الإنتاج وأجود الخامات لتقديم منتجات تلبي المواصفات الصناعية العالية التي يحتاجها عملاؤنا من المصانع والشركات الكبرى.',
      aboutH1Title:      'الموقع',
      aboutH1Desc:       'المنطقة الصناعية السادسة، مدينة السادات',
      aboutH2Title:      'الكيان القانوني',
      aboutH2Desc:       'شركة ذات مسئولية محدودة (LLC)',
      aboutH3Title:      'الجودة',
      aboutH3Desc:       'مواصفات صناعية عالية المستوى',
      aboutH4Title:      'الطاقة الإنتاجية',
      aboutH4Desc:       'قادرون على تلبية الطلبات الضخمة',
      aboutCta:          'تواصل معنا',
      aboutStat1Num:     '9+',
      aboutStat1Lbl:     'سنوات من الخبرة',
      aboutStat2Num:     '6+',
      aboutStat2Lbl:     'صناعات نخدمها',

      /* Products */
      productsEyebrow:   'منتجاتنا',
      productsTitle:     'كراتين تغليف لكل احتياج صناعي',
      productsSubtitle:  'نصنع طيفًا واسعًا من كراتين التغليف المموج بمواصفات مخصصة تلبيةً لمتطلبات كل عميل.',
      prod1Tag:          'أحادي الموجة',
      prod1Title:        'كرتون أحادي الموجة',
      prod1Desc:         'مثالي للمنتجات خفيفة إلى متوسطة الوزن. يوفر حماية كافية مع تكلفة اقتصادية مناسبة للإنتاج بكميات كبيرة.',
      prod1F1:           'مناسب للأوزان الخفيفة والمتوسطة',
      prod1F2:           'موجات E أو B حسب المتطلب',
      prod1F3:           'أبعاد مخصصة وفق المواصفات',
      prod2Tag:          'مزدوج الموجة',
      prod2Title:        'كرتون مزدوج الموجة',
      prod2Desc:         'مقاومة مضاعفة للضغط والصدمات، مثالي للمنتجات ثقيلة الوزن ومتطلبات الشحن البعيد أو التخزين الطويل.',
      prod2F1:           'مقاومة عالية للضغط والتكديس',
      prod2F2:           'موجة B+C مدمجة',
      prod2F3:           'مناسب للتخزين والشحن الثقيل',
      prod3Tag:          'صناعي ثقيل',
      prod3Title:        'كرتون صناعي ثقيل الحمولة',
      prod3Desc:         'مصمم للتحمل القصوى في البيئات الصناعية الشاقة. يُستخدم لمصانع الزجاج والأواني وتغليف البضائع الثقيلة.',
      prod3F1:           'تحمل أوزان صناعية عالية',
      prod3F2:           'مقاومة للرطوبة والضغط',
      prod3F3:           'مثالي لمصانع الزجاج والأواني',
      prod4Tag:          'مقطوع مخصص',
      prod4Title:        'كرتون مقطوع بمقاسات مخصصة',
      prod4Desc:         'قطع دقيقة وأشكال مخصصة بالكامل حسب مواصفات العميل. الحل الأمثل للمنتجات ذات الأشكال غير الاعتيادية.',
      prod4F1:           'أشكال وأبعاد بالمواصفة الدقيقة',
      prod4F2:           'مناسب لمختلف أنواع المنتجات',
      prod4F3:           'حل مثالي للأشكال غير القياسية',
      prodCtaLabel:      'اطلب عرض سعر',
      productsPricingNote: 'الأسعار ليست ثابتة — تتوقف على المواصفات والكميات. تواصل معنا للحصول على عرض سعر مخصص لاحتياجاتك.',
      productsCtaBtn:    'اطلب عرض سعر مخصص',

      /* Industries */
      industriesEyebrow: 'عملاؤنا',
      industriesTitle:   'الصناعات التي نخدمها',
      industriesSubtitle:'نقدم حلول تغليف متخصصة لطيف واسع من الصناعات المصرية والإقليمية.',
      ind1Title:         'مصانع الغذاء',
      ind1Desc:          'كراتين متوافقة مع اشتراطات الغذاء الآمن وتتحمل الرطوبة والبرودة.',
      ind2Title:         'مصانع المياه المعدنية',
      ind2Desc:          'تغليف متين للعبوات البلاستيكية والزجاجية مع تحمل الأوزان العالية.',
      ind3Title:         'شركات الأسمدة الزراعية',
      ind3Desc:          'كراتين مقاومة للمواد الكيميائية ومناسبة للأحجام والأوزان الكبيرة.',
      ind4Title:         'مصانع الزجاج',
      ind4Desc:          'تغليف واقٍ ممتاز للمنتجات الزجاجية الهشة مع فواصل داخلية حسب الطلب.',
      ind5Title:         'مصانع الزيوت',
      ind5Desc:          'كراتين مقاومة لتسرب الزيوت ومناسبة لعبوات الزيت بأحجامها المختلفة.',
      ind6Title:         'مصانع أواني الطهي',
      ind6Desc:          'تغليف احترافي للأواني المنزلية يضمن الوصول سليمًا إلى المستهلك النهائي.',
      ind7Title:         'محطات التصدير',
      ind7Desc:          'نستعد لتوسيع خدماتنا لتشمل محطات التصدير وتلبية متطلبات التعبئة للأسواق الدولية.',
      indComingSoonBadge:'قريبًا',

      /* Specifications */
      specsEyebrow:      'المواصفات الفنية',
      specsTitle:        'مواصفات الإنتاج والموجات',
      specsSubtitle:     'بيانات فنية دقيقة يحتاجها المشتري الصناعي لاختيار النوع والقوة المناسبين.',
      specsDimTitle:     'أبعاد خط الإنتاج',
      specsDimSub:       'الحد الأقصى لأبعاد خط التصنيع',
      specsWidthLabel:   'العرض (Width)',
      specsLengthLabel:  'الطول (Length)',
      specsDimNote:      'يمكن إنتاج كراتين بأبعاد مختلفة ضمن هذه الحدود القصوى. تواصل معنا لمناقشة مواصفاتك المحددة.',
      specsFlutesTitle:  'أنواع الموجات ومعاملاتها',
      spacesFlutesSub:   'معامل الموجة يحدد كمية الورق الإضافي المستخدم',
      specsFluteTh1:     'نوع الموجة',
      specsFluteTh2:     'معامل الموجة',
      specsEFluteName:   'موجة E',
      specsEFluteDesc:   'ناعمة — للتعبئة الخفيفة',
      specsBFluteName:   'موجة B',
      specsBFluteDesc:   'متوسطة — الأكثر استخدامًا',
      specsCFluteName:   'موجة C',
      specsCFluteDesc:   'خشنة — للحمولات الثقيلة',
      specsFlutesNote:   'معامل الموجة = نسبة الورق المستخدم في الموجة مقارنةً بالطول الكلي للكرتون. كلما ارتفع المعامل زادت قوة الكرتون ووزنه.',

      /* Contact */
      contactEyebrow:    'تواصل معنا',
      contactTitle:      'نحن هنا للإجابة على استفساراتك',
      contactSubtitle:   'سواء كنت تبحث عن عرض سعر أو لديك استفسار فني، تواصل معنا وسنرد عليك في أقرب وقت.',
      contactPhone1Label:'الهاتف الرئيسي',
      contactPhone2Label:'الهاتف الثانوي',
      contactPhoneSub:   'متاح خلال ساعات العمل',
      contactWaLabel:    'واتساب',
      contactWaSub:      'تواصل مباشر عبر واتساب',
      contactEmailGenLabel: 'البريد العام',
      contactEmailGenSub:   'للاستفسارات العامة',
      contactEmailSalesLabel: 'بريد المبيعات وعروض الأسعار',
      contactEmailSalesSub:   'لطلبات عروض الأسعار والأسعار',
      contactAddrLabel:  'العنوان',
      contactAddrValue:  'قطعة 2/6276، المنطقة الصناعية السادسة',
      contactAddrSub:    'مدينة السادات، المنوفية، مصر',
      contactMapLabel:   '[خريطة جوجل — موقع المصنع: المنطقة الصناعية السادسة، مدينة السادات]',
      contactMapLink:    'فتح في خرائط جوجل',
      contactFormTitle:  'اطلب عرض سعر',
      contactFormSub:    'أرسل لنا تفاصيل احتياجاتك وسنتواصل معك خلال 24 ساعة بعرض سعر مخصص.',
      formName:          'الاسم الكامل',
      formNamePh:        'اسمك الكريم',
      formCompany:       'اسم الشركة / المصنع',
      formCompanyPh:     'اسم شركتك أو مصنعك',
      formPhone:         'رقم الهاتف',
      formPhonePh:       '010XXXXXXXX',
      formIndustry:      'القطاع الصناعي',
      formIndustryDefault: 'اختر قطاعك',
      formInd1:          'مصانع الغذاء',
      formInd2:          'مصانع المياه المعدنية',
      formInd3:          'شركات الأسمدة الزراعية',
      formInd4:          'مصانع الزجاج',
      formInd5:          'مصانع الزيوت',
      formInd6:          'مصانع أواني الطهي',
      formInd7:          'أخرى',
      formMessage:       'تفاصيل الطلب',
      formMessagePh:     'اذكر نوع الكرتون، الأبعاد المطلوبة، الكميات، وأي متطلبات خاصة...',
      formSubmit:        'إرسال الطلب',
      formWhatsapp:      'واتساب',

      /* Footer */
      footerDesc:        'فوريو باك ذات مسئولية محدودة — شركة رائدة في تصنيع كراتين التغليف المموج للصناعات المصرية منذ 2017. مدينة السادات، المنوفية، مصر.',
      footerNavTitle:    'روابط سريعة',
      footerContactTitle:'تواصل معنا',
      footerLocationTitle:'الموقع',
      footerAddress:     'قطعة 2/6276\nالمنطقة الصناعية السادسة\nمدينة السادات، المنوفية\nمصر',
      footerCopyright:   '© 2026 ForYouPack — فوريو باك ذات مسئولية محدودة. جميع الحقوق محفوظة · All rights reserved.',
      footerPrivacy:     'سياسة الخصوصية',
      footerTerms:       'الشروط والأحكام',

      /* Shared UI labels */
      footerWaPrefix:    'واتساب:',
      waTip:             'تواصل عبر واتساب',

      /* Image labels */
      aboutImgLabel:     '[صورة: مبنى المصنع — مرفق إنتاج فوريو باك، مدينة السادات]',
      prodImgLabel1:     '[صورة المنتج: كرتون مموج — أحادي الموجة]',
      prodImgLabel2:     '[صورة المنتج: كرتون مموج — مزدوج الموجة]',
      prodImgLabel3:     '[صورة المنتج: كرتون مموج — صناعي ثقيل الحمولة]',
      prodImgLabel4:     '[صورة المنتج: كرتون مموج — مقطوع بمقاسات مخصصة]',
    }
  };


  /* ============================================================
     STATE
     ============================================================ */
  let currentLang  = localStorage.getItem(LANG_KEY)  || DEFAULT_LANG;
  let currentTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;

  /* ============================================================
     THEME MANAGEMENT
     ============================================================ */
  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update toggle button icon
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.querySelector('.icon-sun').style.display  = theme === 'dark' ? 'block' : 'none';
      btn.querySelector('.icon-moon').style.display = theme === 'dark' ? 'none'  : 'block';
    }
  }

  /* ============================================================
     LANGUAGE MANAGEMENT
     ============================================================ */
  function applyLanguage(lang) {
    currentLang = lang;
    // Apply dir and lang to the root <html> element only.
    // The body inherits dir from html; we keep body.lang in sync for CSS selectors.
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.lang = lang;
    localStorage.setItem(LANG_KEY, lang);

    // Translate all elements with data-i18n attribute
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.placeholder = t[key];
      }
    });

    // Translate alt attributes
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      if (t[key] !== undefined) {
        el.alt = t[key];
      }
    });

    // Update page title & meta
    document.title = t.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDesc);

    // Update lang toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', btnLang === lang);
    });
  }

  /* ============================================================
     HEADER SCROLL BEHAVIOR
     ============================================================ */
  function initScrollBehavior() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScrollY = window.scrollY;

    function onScroll() {
      const scrollY = window.scrollY;
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run on load
  }

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (!menuBtn || !mobileNav) return;

    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileNav.classList.add('open');
        menuBtn.classList.add('open');
        menuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on link click
    mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileNav.classList.remove('open');
        menuBtn.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ============================================================
     ACTIVE NAV LINK (scroll-based)
     ============================================================ */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const headerH = document.getElementById('header')?.offsetHeight || 72;
          const top = target.getBoundingClientRect().top + window.scrollY - headerH;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================================
     NUMBER COUNTER ANIMATION (for stats)
     ============================================================ */
  function animateCounter(el, target, duration = 1500) {
    const start = performance.now();
    const startVal = 0;

    function update(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(startVal + (target - startVal) * eased);
      el.textContent = current + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  /* ============================================================
     SCROLL REVEAL ANIMATION
     ============================================================ */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ============================================================
     CONTACT FORM HANDLER
     ============================================================ */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      // Build a clean WhatsApp message from form data as fallback
      const name     = document.getElementById('fieldName')?.value.trim()    || '';
      const company  = document.getElementById('fieldCompany')?.value.trim() || '';
      const phone    = document.getElementById('fieldPhone')?.value.trim()   || '';
      const industry = document.getElementById('fieldIndustry')?.value       || '';
      const message  = document.getElementById('fieldMessage')?.value.trim() || '';

      if (!name || !phone || !message) return; // let browser handle validation

      // Optional: open WhatsApp as well after mailto fires
      const text = encodeURIComponent(
        `اسم: ${name}\nالشركة: ${company}\nالهاتف: ${phone}\nالقطاع: ${industry}\nتفاصيل:\n${message}`
      );
      // Store for WhatsApp button so it reflects current form data
      const waBtn = document.getElementById('whatsappBtn');
      if (waBtn) {
        waBtn.href = `https://wa.me/201024889292?text=${text}`;
      }
    });

    // Live-update WhatsApp link when user types
    ['fieldName','fieldCompany','fieldPhone','fieldIndustry','fieldMessage'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          const n = document.getElementById('fieldName')?.value.trim()    || '';
          const c = document.getElementById('fieldCompany')?.value.trim() || '';
          const p = document.getElementById('fieldPhone')?.value.trim()   || '';
          const i = document.getElementById('fieldIndustry')?.value       || '';
          const m = document.getElementById('fieldMessage')?.value.trim() || '';
          const text = encodeURIComponent(`اسم: ${n}\nالشركة: ${c}\nالهاتف: ${p}\nالقطاع: ${i}\nتفاصيل:\n${m}`);
          const waBtn = document.getElementById('whatsappBtn');
          if (waBtn) waBtn.href = `https://wa.me/201024889292?text=${text}`;
        });
      }
    });
  }

  /* ============================================================
     SCROLL PROGRESS BAR
     ============================================================ */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    function updateProgress() {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width  = Math.min(pct, 100) + '%';
      bar.setAttribute('aria-valuenow', Math.round(pct));
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ============================================================
     BACK TO TOP BUTTON
     ============================================================ */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     URL LANG PARAM DETECTION
     ============================================================ */
  function detectLangFromURL() {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'en' || urlLang === 'ar') {
      return urlLang;
    }
    return null;
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    // Detect lang from URL param first, then localStorage, then default
    const urlLang = detectLangFromURL();
    if (urlLang) {
      currentLang = urlLang;
      localStorage.setItem(LANG_KEY, urlLang);
    }

    // Apply saved preferences
    applyTheme(currentTheme);
    applyLanguage(currentLang);

    // Theme toggle click
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const next = currentTheme === 'dark' ? 'blue' : 'dark';
        document.documentElement.classList.add('theme-transitioning');
        applyTheme(next);
        setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 400);
      });
    }

    // Language toggle clicks
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang !== currentLang) applyLanguage(lang);
      });
    });

    // All behaviors
    initScrollBehavior();
    initScrollProgress();
    initBackToTop();
    initMobileMenu();
    initActiveNav();
    initSmoothScroll();
    initCounters();
    initReveal();
    initContactForm();
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
