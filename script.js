// Tian Zeqi Portfolio Website JavaScript
// Handles rendering, translations, navigation, and interactions.

// Translations object
const translations = {
    zh: {
        nav: {
            home: '首页',
            about: '个人介绍',
            experience: '职务',
            services: '工作领域',
            philosophy: '商业理念',
            contact: '与我联系'
        },
        hero: {
            name: '田泽琦',
            englishName: 'Captain Zeqi',
            title: '中级区块链金融行业工程师 | 跨境电商5年从业者 | 企业投融资顾问 | 企业出海全球架构搭建顾问',
            contactBtn: '与我联系',
            learnMoreBtn: '了解更多'
        },
        about: {
            title: '个人介绍',
            greeting: '你好！',
            description1: '五年跨境电商从业经验，大学在校创业曾获得中国国际互联网+大赛国家级三等奖、蓝桥杯大赛国家级一等奖。从事平台：亚马逊、ETSY、TikTok、Ozon、Wildberries、Temu、SHEIN、海外独立站。',
            description2: '集团现从事跨境销售、企业出海搭建、货盘对接、个性化定制产品供应链、国际物流及海外仓对接、国际品牌管理、企业全球开店、初创投融资、海外全球企业搭建管理服务等业务。',
            experience: '年跨境电商经验',
            positions: '企业董事职位'
        },
        experience: {
            title: '职务',
            jobs: [
                {
                    title: '顺为国际集团有限公司（香港）',
                    role: '法团董事会董事',
                    description: '负责集团整体战略规划和国际业务拓展'
                },
                {
                    title: '深圳稳金国际供应链有限公司',
                    role: '董事',
                    description: '管理国际供应链业务和跨境物流服务'
                },
                {
                    title: '内蒙古商舟资本管理有限公司',
                    role: '董事',
                    description: '资本管理和投资决策'
                },
                {
                    title: '内蒙古快船商业管理有限公司',
                    role: '董事',
                    description: '商业管理和运营优化'
                },
                {
                    title: '内蒙古前川工程有限公司',
                    role: '投资人',
                    description: '工程项目投资和管理'
                },
                {
                    title: '佰仕达国际商务(香港)有限公司',
                    role: '代理公司负责人',
                    description: '代理业务管理和客户服务'
                },
                {
                    title: '区块链金融行业',
                    role: '中级工程师',
                    description: '区块链技术在金融领域的应用和开发'
                }
            ]
        },
        services: {
            title: '工作领域',
            items: [
                {
                    title: '跨境电商',
                    description: 'Amazon, ETSY, TikTok, Ozon, Wildberries, Temu, SHEIN等平台运营',
                    icon: '🌐'
                },
                {
                    title: '企业出海搭建',
                    description: '协助企业进行海外市场拓展和业务建设',
                    icon: '🏢'
                },
                {
                    title: '供应链管理',
                    description: '个性化定制产品供应链和货盘对接服务',
                    icon: '📦'
                },
                {
                    title: '国际物流',
                    description: '海外仓库对接和国际物流解决方案',
                    icon: '🚚'
                },
                {
                    title: '品牌管理',
                    description: '国际品牌管理和企业全球开店服务',
                    icon: '🎯'
                },
                {
                    title: '投融资服务',
                    description: '初创企业投资和融资咨询服务',
                    icon: '💰'
                }
            ]
        },
        philosophy: {
            title: '商业理念',
            items: [
                {
                    title: '资源整合创造价值',
                    description: '通过资源的高效利用和整合创造价值',
                    subtitle: 'CREATE VALUE THROUGH THE EFFICIENT USE AND INTEGRATION OF RESOURCES.'
                },
                {
                    title: '信息不对称优势',
                    description: '通过利用信息不对称创造价值',
                    subtitle: 'CREATE VALUE BY EXPLOITING INFORMATION ASYMMETRIES.'
                },
                {
                    title: '顺应市场趋势',
                    description: '顺应潮流——与主流趋势保持一致',
                    subtitle: 'MOVE WITH THE TIDE—ALIGN WITH PREVAILING TRENDS.'
                },
                {
                    title: '持续自我投资',
                    description: '投资自己以提高内在价值：永不停止学习',
                    subtitle: 'INVEST IN YOURSELF TO RAISE YOUR INTRINSIC WORTH: NEVER STOP LEARNING.'
                }
            ]
        },
        contact: {
            title: '与我联系',
            subtitle: 'Connect with me',
            address: '地址',
            email: '邮箱',
            phone: '电话',
            socialMedia: '社交媒体',
            sendMessage: '发送消息',
            form: {
                name: '姓名',
                namePlaceholder: '您的姓名',
                email: '邮箱',
                emailPlaceholder: '您的邮箱',
                message: '消息',
                messagePlaceholder: '您的消息',
                submit: '发送消息'
            },
            info: {
                address: '香港九龙新蒲岗太子道东 704 号新时代工贸商业中心 1701-02 室 AO7 房',
                emails: [
                    'Shinevistagroup@gmail.com',
                    'Captain@tianzeqi.com'
                ],
                phones: [
                    '+85261600784',
                    '+8618347348633',
                    '+8615799916014'
                ]
            }
        },
        footer: {
            copyright: '© 2025 田泽琦 (Captain Zeqi). 版权所有。'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'Introduction',
            experience: 'Job Title',
            services: 'Work Areas',
            philosophy: 'Business Concept',
            contact: 'Contact me'
        },
        hero: {
            name: 'Tian Zeqi',
            englishName: 'Captain Zeqi',
            title: 'Intermediate blockchain financial industry engineer | 5 years of cross-border e-commerce experience | Corporate investment and financing consultant | Global architecture consultant for companies expanding overseas',
            contactBtn: 'Contact me',
            learnMoreBtn: 'Learn More'
        },
        about: {
            title: 'Introduction',
            greeting: 'Hello there!',
            description1: 'Five years of experience in cross-border e-commerce. He won the third prize of the China International Internet + Competition and the first prize of the Blue Bridge Cup Competition while starting a business in college. Platforms: Amazon, ETSY, TikTok, Ozon, Wildberries, Temu, SHEIN, and overseas independent stations.',
            description2: 'The group is currently engaged in cross-border sales, enterprise overseas construction, cargo docking, personalized customized product supply chain, international logistics and overseas warehouse integration, international brand management, enterprise global store opening, startup investment and financing, overseas global enterprise construction and management services, etc.',
            experience: 'Years Cross-border E-commerce Experience',
            positions: 'Corporate Director Positions'
        },
        experience: {
            title: 'Job Title',
            jobs: [
                {
                    title: 'SHINEVISTA GLOBAL GROUP LIMITED (HK)',
                    role: 'Director',
                    description: 'Responsible for overall strategic planning and international business expansion'
                },
                {
                    title: 'Shenzhen Wenjin International Supply Chain Co., Ltd.',
                    role: 'Director',
                    description: 'Managing international supply chain business and cross-border logistics services'
                },
                {
                    title: 'Inner Mongolia Shangzhou Capital Management Co., Ltd.',
                    role: 'Director',
                    description: 'Capital management and investment decisions'
                },
                {
                    title: 'Inner Mongolia Kuaichuan Commercial Management Co., Ltd.',
                    role: 'Director',
                    description: 'Business management and operational optimization'
                },
                {
                    title: 'Inner Mongolia Qianchuan Engineering Co., Ltd.',
                    role: 'Investors',
                    description: 'Engineering project investment and management'
                },
                {
                    title: 'Baishida International Business (Hong Kong) Co., Ltd.',
                    role: 'Agent Company Manager',
                    description: 'Agency business management and customer service'
                },
                {
                    title: 'Blockchain Financial Industry',
                    role: 'Intermediate Engineer',
                    description: 'Application and development of blockchain technology in the financial field'
                }
            ]
        },
        services: {
            title: 'Work Areas',
            items: [
                {
                    title: 'Cross-border E-commerce',
                    description: 'Platform operations including Amazon, ETSY, TikTok, Ozon, Wildberries, Temu, SHEIN',
                    icon: '🌐'
                },
                {
                    title: 'Enterprise Overseas Construction',
                    description: 'Assisting enterprises in overseas market expansion and business construction',
                    icon: '🏢'
                },
                {
                    title: 'Supply Chain Management',
                    description: 'Personalized customized product supply chain and pallet docking services',
                    icon: '📦'
                },
                {
                    title: 'International Logistics',
                    description: 'Overseas warehouse docking and international logistics solutions',
                    icon: '🚚'
                },
                {
                    title: 'Brand Management',
                    description: 'International brand management and enterprise global store opening services',
                    icon: '🎯'
                },
                {
                    title: 'Investment and Financing',
                    description: 'Startup investment and financing consulting services',
                    icon: '💰'
                }
            ]
        },
        philosophy: {
            title: 'Business Concept',
            items: [
                {
                    title: 'Resource Integration Creates Value',
                    description: 'Create value through the efficient use and integration of resources',
                    subtitle: 'CREATE VALUE THROUGH THE EFFICIENT USE AND INTEGRATION OF RESOURCES.'
                },
                {
                    title: 'Information Asymmetry Advantage',
                    description: 'Create value by exploiting information asymmetries',
                    subtitle: 'CREATE VALUE BY EXPLOITING INFORMATION ASYMMETRIES.'
                },
                {
                    title: 'Follow Market Trends',
                    description: 'Move with the tide—align with prevailing trends',
                    subtitle: 'MOVE WITH THE TIDE—ALIGN WITH PREVAILING TRENDS.'
                },
                {
                    title: 'Continuous Self-Investment',
                    description: 'Invest in yourself to raise your intrinsic worth: never stop learning',
                    subtitle: 'INVEST IN YOURSELF TO RAISE YOUR INTRINSIC WORTH: NEVER STOP LEARNING.'
                }
            ]
        },
        contact: {
            title: 'Contact me',
            subtitle: 'Connect with me',
            address: 'Address',
            email: 'Email',
            phone: 'Phone',
            socialMedia: 'Social Media',
            sendMessage: 'Send Message',
            form: {
                name: 'Name',
                namePlaceholder: 'Your Name',
                email: 'Email',
                emailPlaceholder: 'Your Email',
                message: 'Message',
                messagePlaceholder: 'Your Message',
                submit: 'Send Message'
            },
            info: {
                address: 'RM AO7,1701-02 NEW TREND CENTRE, 704 PRINCE EDWARD ROAD EAST, SAN PO KONG KLN',
                emails: [
                    'shinevistagroup@gmail.com',
                    'luckyzeqi@gmail.com',
                    'Captain@tianzeqi.com'
                ],
                phones: [
                    '+852 61600784',
                    '+86 18347348633',
                    '+86 15799916014'
                ]
            }
        },
        footer: {
            copyright: '© 2025 Tian Zeqi (Captain Zeqi). All rights reserved.'
        }
    }
};

// Image URLs
const headshotImage = 'https://imgbed.captainzeqi.com/file/常用/1754978283757_tian_zeqi_portrait_1.jpeg';
const aboutImage = "https://imgbed.captainzeqi.com/file/常用/1754978283648_tian_zeqi_portrait_2.png";

// Global state
let currentLanguage = 'zh';
let isMenuOpen = false;
let activeSection = 'home';

// Utility functions
function t() {
    return translations[currentLanguage];
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    isMenuOpen = false;
    renderApp();
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', currentLanguage); // Store preference
    renderApp();
}

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    renderApp();
}

function handleScroll() {
    const sections = ['home', 'about', 'experience', 'services', 'philosophy', 'contact'];
    // Offset for fixed header and smoother active state
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                activeSection = section;
                break;
            }
        }
    }
    renderApp(); // Re-render to update active navigation item
}

// SVG Icons (keeping simplified for in-JS rendering)
const icons = {
    menu: '☰',
    close: '✕',
    mapPin: `<svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>`,
    mail: `<svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>`,
    phone: `<svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
    </svg>`,
    messageSquare: `<svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
    </svg>`,
    briefcase: `<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>`,
    wechat: `<svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
    </svg>`,
    whatsapp: `<svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
    </svg>`,
    telegram: `<svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>`
};

// Main render function
function renderApp() {
    const trans = t();
    const navItems = [
        { id: 'home', label: trans.nav.home },
        { id: 'about', label: trans.nav.about },
        { id: 'experience', label: trans.nav.experience },
        { id: 'services', label: trans.nav.services },
        { id: 'philosophy', label: trans.nav.philosophy },
        { id: 'contact', label: trans.nav.contact },
    ];

    document.getElementById('root').innerHTML = `
        <!-- Language Toggle -->
        <div class="fixed top-4 right-4 z-50">
            <button onclick="toggleLanguage()" class="bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-colors font-medium text-gray-900">
                ${currentLanguage === 'zh' ? 'EN' : '中文'}
            </button>
        </div>

        <!-- Navigation -->
        <nav class="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="text-2xl font-bold text-gray-900">
                        ${trans.hero.name}
                    </div>

                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex space-x-8">
                        ${navItems.map(item => `
                            <button onclick="scrollToSection('${item.id}')" class="px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeSection === item.id
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-700 hover:text-blue-600'
                            }">
                                ${item.label}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Mobile menu button -->
                    <div class="md:hidden">
                        <button onclick="toggleMenu()" class="text-gray-700 hover:text-blue-600">
                            ${isMenuOpen ? icons.close : icons.menu}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Navigation -->
            ${isMenuOpen ? `
                <div class="md:hidden bg-white border-t">
                    <div class="px-2 pt-2 pb-3 space-y-1">
                        ${navItems.map(item => `
                            <button onclick="scrollToSection('${item.id}')" class="block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                                activeSection === item.id
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-700 hover:text-blue-600'
                            }">
                                ${item.label}
                            </button>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </nav>

        <!-- Hero Section -->
        <section id="home" class="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col lg:flex-row items-center justify-between lg:space-x-12">
                    <div class="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
                        <img src="${headshotImage}" alt="${trans.hero.name}" class="w-full h-auto object-cover rounded-2xl shadow-2xl hover-scale">
                    </div>

                    <div class="lg:w-1/2">
                        <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                            ${trans.hero.name}
                            <br>
                            <span class="text-blue-600 text-3xl lg:text-4xl">${trans.hero.englishName}</span>
                        </h1>
                        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                            ${trans.hero.title}
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4">
                            <button onclick="scrollToSection('contact')" class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                ${trans.hero.contactBtn}
                            </button>
                            <button onclick="scrollToSection('about')" class="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                                ${trans.hero.learnMoreBtn}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">${trans.about.title}</h2>
                    <div class="w-24 h-1 bg-blue-600 mx-auto"></div>
                </div>

                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 class="text-2xl font-semibold text-gray-900 mb-6">${trans.about.greeting}</h3>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            ${trans.about.description1}
                        </p>
                        <p class="text-gray-600 mb-8 leading-relaxed">
                            ${trans.about.description2}
                        </p>
                        
                        <div class="grid grid-cols-2 gap-8">
                            <div class="text-center">
                                <div class="text-4xl font-bold text-blue-600 mb-2">5+</div>
                                <div class="text-gray-600">${trans.about.experience}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold text-purple-600 mb-2">6+</div>
                                <div class="text-gray-600">${trans.about.positions}</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <img src="${aboutImage}" alt="About" class="w-full max-w-lg rounded-lg shadow-xl">
                    </div>
                </div>
            </div>
        </section>

        <!-- Experience Section -->
        <section id="experience" class="py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">${trans.experience.title}</h2>
                    <div class="w-24 h-1 bg-blue-600 mx-auto"></div>
                </div>

                <div class="space-y-8">
                    ${trans.experience.jobs.map(job => `
                        <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0">
                                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        ${icons.briefcase}
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-xl font-semibold text-gray-900 mb-1">${job.title}</h3>
                                    <p class="text-blue-600 font-medium mb-2">${job.role}</p>
                                    <p class="text-gray-600">${job.description}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">${trans.services.title}</h2>
                    <div class="w-24 h-1 bg-blue-600 mx-auto"></div>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${trans.services.items.map(service => `
                        <div class="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                            <div class="text-4xl mb-4">${service.icon}</div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-3">${service.title}</h3>
                            <p class="text-gray-600">${service.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Philosophy Section -->
        <section id="philosophy" class="py-20 bg-gray-900 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">${trans.philosophy.title}</h2>
                    <div class="w-24 h-1 bg-blue-400 mx-auto"></div>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                    ${trans.philosophy.items.map(item => `
                        <div class="bg-gray-800 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-3 text-blue-400">${item.title}</h3>
                            <p class="text-gray-300 mb-4">${item.description}</p>
                            <p class="text-sm text-gray-400 italic">${item.subtitle}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">${trans.contact.title}</h2>
                    <p class="text-xl text-gray-600">${trans.contact.subtitle}</p>
                    <div class="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
                </div>

                <div class="grid lg:grid-cols-2 gap-12">
                    <div>
                        <div class="space-y-8">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    ${icons.mapPin}
                                    ${trans.contact.address}
                                </h3>
                                <p class="text-gray-600 ml-7">${trans.contact.info.address}</p>
                            </div>

                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    ${icons.mail}
                                    ${trans.contact.email}
                                </h3>
                                <div class="ml-7 space-y-2">
                                    ${trans.contact.info.emails.map(email => `
                                        <p class="text-gray-600">${email}</p>
                                    `).join('')}
                                </div>
                            </div>

                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    ${icons.phone}
                                    ${trans.contact.phone}
                                </h3>
                                <div class="ml-7 space-y-2">
                                    ${trans.contact.info.phones.map(phone => `
                                        <p class="text-gray-600">${phone}</p>
                                    `).join('')}
                                </div>
                            </div>

                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    ${icons.messageSquare}
                                    ${trans.contact.socialMedia}
                                </h3>
                                <div class="ml-7 flex space-x-4">
                                    <a href="#" class="text-green-600 hover:text-green-700 transition-colors social-link wechat">
                                        ${icons.wechat}
                                    </a>
                                    <a href="#" class="text-green-500 hover:text-green-600 transition-colors social-link whatsapp">
                                        ${icons.whatsapp}
                                    </a>
                                    <a href="#" class="text-blue-500 hover:text-blue-600 transition-colors social-link telegram">
                                        ${icons.telegram}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" target="_blank" class="space-y-6">
                            <div>
                                <label for="contact-name" class="block text-sm font-medium text-gray-700 mb-2">
                                    ${trans.contact.form.name}
                                </label>
                                <input type="text" id="contact-name" name="name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="${trans.contact.form.namePlaceholder}" required>
                            </div>
                            <div>
                                <label for="contact-email" class="block text-sm font-medium text-gray-700 mb-2">
                                    ${trans.contact.form.email}
                                </label>
                                <input type="email" id="contact-email" name="_replyto" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="${trans.contact.form.emailPlaceholder}" required>
                            </div>
                            <div>
                                <label for="contact-message" class="block text-sm font-medium text-gray-700 mb-2">
                                    ${trans.contact.form.message}
                                </label>
                                <textarea id="contact-message" name="message" rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="${trans.contact.form.messagePlaceholder}" required></textarea>
                            </div>
                            <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                ${trans.contact.form.submit}
                            </button>
                            <p class="text-sm text-gray-500 mt-4">
                                ${currentLanguage === 'zh' ? '注：此表单功能需要配置 Formspree (Formspree.io) 才能正常发送邮件。请将表单的 action URL 中的 "YOUR_FORMSPREE_ID" 替换为您的实际 Formspree ID。' : 'Note: This form requires configuration with Formspree (Formspree.io) to send emails properly. Please replace "YOUR_FORMSPREE_ID" in the form\'s action URL with your actual Formspree ID.'}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <p class="text-gray-400">${trans.footer.copyright}</p>
                </div>
            </div>
        </footer>
    `;
}

// Initialize the application
function initApp() {
    // Check for language preference in localStorage
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        currentLanguage = savedLang;
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial render and set active section based on current scroll position
    handleScroll(); 
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}```

---

### GitHub Pages 部署教学 (完整版，包含 Formspree 配置)

以下是详细的步骤，即使您不熟悉代码和 GitHub 也能轻松完成。您需要将上面提供的三个文件上传到您的 GitHub 仓库：`index.html`、`style.css` 和 `script.js`。

#### 步骤 1: 创建 GitHub 账号 (如果还没有)

1.  打开浏览器，访问 [GitHub 官网](https://github.com/)。
2.  点击 "Sign up" (注册) 按钮。
3.  按照提示输入您的邮箱、密码，并创建用户名。
4.  完成邮箱验证。

#### 步骤 2: 创建一个新的 GitHub 仓库 (Repository)

1.  登录您的 GitHub 账号。
2.  在页面右上角，点击您的头像，然后选择 "Your repositories" (您的仓库)。
3.  点击绿色的 "New" (新建) 按钮，创建一个新仓库。
4.  **Repository name (仓库名称):**
    *   如果您想将网站部署在 `您的用户名.github.io` (例如：`yourusername.github.io`)，那么仓库名称必须是 `您的用户名.github.io` (例如：`tianzeqi.github.io`)。这是一个特殊的仓库，用于托管您的个人网站。
    *   如果您想将网站部署在 `您的用户名.github.io/仓库名称` (例如：`yourusername.github.io/my-portfolio`)，那么仓库名称可以取任何您喜欢的名字，例如 `my-portfolio` 或 `captain-zeqi-website`。
    *   **建议：** 为了简单起见，我建议您创建一个名为 `captain-zeqi-portfolio` 的仓库，这样您的网站地址会是 `https://您的用户名.github.io/captain-zeqi-portfolio/`。
5.  **Description (可选):** 填写一些关于您网站的描述，例如 "田泽琦的个人作品集"。
6.  **Public (公开):** 确保选择 "Public"，因为 GitHub Pages 只能用于公开仓库。
7.  **Add a README file (添加 README 文件):** 勾选此选项，这样会为您创建一个初始文件。
8.  点击绿色的 "Create repository" (创建仓库) 按钮。

#### 步骤 3: 上传网站文件到 GitHub

1.  在您的电脑上，创建一个新的文件夹，例如 `tianzeqi-website`。
2.  将上面提供的 **优化后** 的 `index.html`、`style.css` 和 `script.js` 文件保存到这个 `tianzeqi-website` 文件夹中。
    *   **重要提示：** 这三个文件必须直接放在这个文件夹的根目录，不能再放到子文件夹里。
3.  回到您在 GitHub 上创建的仓库页面。
4.  点击 "Add file" (添加文件) 按钮，然后选择 "Upload files" (上传文件)。
5.  将您本地 `tianzeqi-website` 文件夹中的 `index.html`、`style.css` 和 `script.js` 文件全部拖拽到 GitHub 页面的虚线框中。
    *   **如果您之前已经上传过文件：** GitHub 会自动识别到您正在上传同名文件，并更新它们。
6.  在页面底部，填写一个简短的提交消息 (Commit message)，例如 "Optimized code for GitHub Pages deployment and integrated Formspree"。
7.  点击绿色的 "Commit changes" (提交更改) 按钮。

#### 步骤 4: 启用 GitHub Pages

1.  在您的 GitHub 仓库页面，点击顶部的 "Settings" (设置) 选项卡。
2.  在左侧菜单中，向下滚动并点击 "Pages"。
3.  在 "Build and deployment" (构建和部署) 部分，找到 "Source" (源) 选项。
    *   将 "Deploy from a branch" (从分支部署) 设置为 "Branch" (分支)。
    *   在下方选择 "main" (或 "master"，这取决于您的仓库默认分支名称) 作为分支。
    *   选择文件夹为 `/ (root)` (根目录)。
4.  点击 "Save" (保存) 按钮。
5.  稍等几分钟，GitHub Pages 会开始构建您的网站。页面顶部会出现一个信息框，提示您的网站已准备好发布。
6.  刷新页面，您会看到一个链接，显示 "Your site is live at <您的网站URL>" (例如：`https://您的用户名.github.io/captain-zeqi-portfolio/`)。点击这个链接，就可以看到您的网站了！

**恭喜！您的优化后的、带有中英文切换功能、风格与参考网站完全一致，并集成了 Formspree 表单的静态网站已经成功部署到 GitHub Pages。**

#### 步骤 5: 配置 Formspree (使联系表单工作)

联系表单现在已经集成到网站代码中，但它还需要您在 Formspree 网站上进行配置才能正常工作。

1.  **注册 Formspree 账号：**
    *   访问 [Formspree 官网](https://formspree.io/)。
    *   点击 "Sign Up" 或 "Get Started" 注册一个免费账号。

2.  **创建新表单：**
    *   登录 Formspree 后，点击 "+ New Form" (新建表单)。
    *   给您的表单起一个名字，例如 "Captain Zeqi Contact Form"。
    *   点击 "Create Form" (创建表单)。

3.  **获取表单 ID：**
    *   创建表单后，您会看到一个页面，上面有您的表单的 URL。这个 URL 看起来像 `https://formspree.io/f/xxxxxxxx`，其中 `xxxxxxxx` 就是您的唯一表单 ID。请复制这个完整的 URL。

4.  **更新 `script.js` 中的表单 `action`：**
    *   回到您在电脑上保存的 `tianzeqi-website` 文件夹。
    *   用文本编辑器打开 `script.js` 文件。
    *   在 `renderApp()` 函数中，找到 `<form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" target="_blank" class="space-y-6">` 这一行。
    *   将 `https://formspree.io/f/YOUR_FORMSPREE_ID` 替换为您从 Formspree 复制的完整 URL。
    *   保存 `script.js` 文件。

5.  **重新上传更新后的 `script.js` 到 GitHub：**
    *   重复上面的 **步骤 3**，将您修改并保存的 `script.js` 文件重新上传到您的 GitHub 仓库。确保填写一个描述性的提交消息，例如 "Updated Formspree ID in script.js"。

完成这些步骤后，您的网站上的联系表单就能够通过 Formspree 正常收集信息，并将它们发送到您注册 Formspree 时使用的邮箱了。

如果您在任何步骤中遇到困难，或者对代码有任何疑问，请随时提问！
