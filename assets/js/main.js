// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
    }
  });
});

// ===== FADE-IN ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== PUBLICATION TABS =====
document.querySelectorAll('.pub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pub-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.pub-list').forEach(l => l.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

// ===== LANGUAGE TOGGLE (EN / PT-BR) =====
(function () {
  // Dictionary: normalized English text -> Brazilian Portuguese.
  // Proper names (institutions, journals, software, paper titles) are kept as-is.
  const dict = {
    // --- Navigation ---
    "About": "Sobre",
    "Experience": "Experiência",
    "Consultancies": "Consultorias",
    "Education": "Formação",
    "Grants": "Financiamentos",
    "Publications": "Publicações",
    "Skills": "Competências",
    "Contact": "Contato",

    // --- Hero ---
    "Researcher": "Pesquisador",
    "• Epidemiologist • RWE • HEOR • HTA": "• Epidemiologista • RWE • HEOR • HTA",
    "Evidence Synthesis • Data Science & Big Data • Artificial Intelligence • Predictive Models • Machine Learning • Data Analysis (R, Python, Stata)": "Síntese de Evidências • Ciência de Dados e Big Data • Inteligência Artificial • Modelos Preditivos • Machine Learning • Análise de Dados (R, Python, Stata)",
    "Download CV": "Baixar CV",
    "LSHTM Profile": "Perfil LSHTM",

    // --- Section headers ---
    "Professional Experience": "Experiência Profissional",
    "Grants & Fellowships": "Financiamentos e Bolsas",
    "Teaching & Supervision": "Ensino e Orientação",
    "Editorial, Peer Review & Recognition": "Editoria, Revisão por Pares e Reconhecimento",
    "Skills & Tools": "Competências e Ferramentas",
    "Get In Touch": "Entre em Contato",

    // --- About: stats & keywords ---
    "Peer-Reviewed Publications": "Publicações Revisadas por Pares",
    "Manuscripts Under Review": "Manuscritos em Revisão",
    "Years in Public Health": "Anos em Saúde Pública",
    "Keywords": "Palavras-chave",
    "Epidemiology": "Epidemiologia",
    "Health Data Science": "Ciência de Dados em Saúde",
    "Biostatistics": "Bioestatística",
    "Predictive Modelling": "Modelagem Preditiva",
    "Public Health": "Saúde Pública",
    "Health Inequalities": "Desigualdades em Saúde",
    "Maternal & Child Health": "Saúde Materno-Infantil",
    "Cardiovascular Epidemiology": "Epidemiologia Cardiovascular",
    "Infectious Disease Epidemiology": "Epidemiologia de Doenças Infecciosas",
    "Nutrition Epidemiology": "Epidemiologia Nutricional",

    // --- Experience: titles ---
    "Researcher in Health Data Science": "Pesquisador em Ciência de Dados em Saúde",
    "Visiting Researcher": "Pesquisador Visitante",
    "Epidemiologist in RWE — PAHO/WHO": "Epidemiologista em RWE — OPAS/OMS",
    "Epidemiologist / Data Scientist": "Epidemiologista / Cientista de Dados",
    "Scientific Curator & Data Analyst": "Curador Científico e Analista de Dados",
    "Data Scientist / Researcher": "Cientista de Dados / Pesquisador",
    "Nutrition Program Manager & Scientific Director": "Gerente de Programa de Nutrição e Diretor Científico",

    // --- Experience: orgs ---
    "London School of Hygiene & Tropical Medicine (LSHTM), UK": "London School of Hygiene & Tropical Medicine (LSHTM), Reino Unido",
    "PROADI-SUS, Hospital Israelita Albert Einstein, São Paulo, Brazil": "PROADI-SUS, Hospital Israelita Albert Einstein, São Paulo, Brasil",
    "Pan American Health Organization / World Health Organization, Brasília, Brazil": "Organização Pan-Americana da Saúde / Organização Mundial da Saúde, Brasília, Brasil",
    "Epidemiological Surveillance Center \"Prof. Alexandre Vranjac\" / São Paulo State, Brazil": "Centro de Vigilância Epidemiológica \"Prof. Alexandre Vranjac\" / Estado de São Paulo, Brasil",
    "Pacto Contra a Fome, São Paulo, Brazil (Remote)": "Pacto Contra a Fome, São Paulo, Brasil (Remoto)",
    "LABDAPS — Big Data and Predictive Health Analytics Laboratory, USP, Brazil": "LABDAPS — Laboratório de Big Data e Análise Preditiva em Saúde, USP, Brasil",
    "Ministry of Health, Mozambique": "Ministério da Saúde, Moçambique",

    // --- Experience: bullets ---
    "Developing predictive models for stillbirths and neonatal deaths using logistic regression, machine learning (XGBoost, random forest), and neural networks": "Desenvolvimento de modelos preditivos para natimortos e óbitos neonatais usando regressão logística, machine learning (XGBoost, random forest) e redes neurais",
    "Managing and analysing large multi-country datasets (>280,000 birth records) from 15 African countries": "Gestão e análise de grandes bases de dados multinacionais (>280.000 registros de nascimento) de 15 países africanos",
    "Designing reproducible data pipelines and validation frameworks (cross-validation, AUC, AIC/BIC)": "Concepção de pipelines de dados reprodutíveis e estruturas de validação (validação cruzada, AUC, AIC/BIC)",
    "Contributing to the MARCH Centre and Maternal & Newborn Health Group": "Contribuição para o MARCH Centre e o Maternal & Newborn Health Group",
    "Methodological research on non-communicable disease (NCD) surveillance, population-based surveys, and innovative data-collection approaches": "Pesquisa metodológica sobre vigilância de doenças crônicas não transmissíveis (DCNT), inquéritos de base populacional e abordagens inovadoras de coleta de dados",
    "Systematic review on multimodal data-collection strategies (SMS, IVR, mobile web, CATI) for telephone health surveys": "Revisão sistemática sobre estratégias multimodais de coleta de dados (SMS, URA, web móvel, CATI) para inquéritos telefônicos de saúde",
    "Modelling temporal trends in NCD risk factors using Vigitel data (2006–2024): ARIMA, exponential smoothing, Holt's method, Prophet": "Modelagem de tendências temporais de fatores de risco de DCNT com dados do Vigitel (2006–2024): ARIMA, suavização exponencial, método de Holt, Prophet",
    "Reproducible analytical pipelines in R and Python informing public-health policy and BI tools": "Pipelines analíticos reprodutíveis em R e Python para subsidiar políticas de saúde pública e ferramentas de BI",
    "Technical consulting to the Ministry of Health on COVID-19 surveillance indicators": "Consultoria técnica ao Ministério da Saúde sobre indicadores de vigilância da COVID-19",
    "Advanced data analysis for public-health decision-making and resource allocation": "Análise avançada de dados para tomada de decisão e alocação de recursos em saúde pública",
    "Contributed to developing national health policies and guidelines": "Contribuição para o desenvolvimento de políticas e diretrizes nacionais de saúde",
    "Spatial analyses for respiratory diseases; nowcasting and forecasting for meningitis, influenza, COVID-19": "Análises espaciais de doenças respiratórias; nowcasting e previsão para meningite, influenza e COVID-19",
    "Developed predictive models for strategic health decision-making": "Desenvolvimento de modelos preditivos para tomada de decisão estratégica em saúde",
    "Translated scientific complexities into actionable insights for food-security policymaking": "Tradução de complexidades científicas em insights acionáveis para políticas de segurança alimentar",
    "Led evidence-based policy projects using data-driven approaches": "Liderança de projetos de políticas baseadas em evidências com abordagens orientadas por dados",
    "Applied ML algorithms for disease outbreak prediction and health risk assessment": "Aplicação de algoritmos de ML para predição de surtos e avaliação de risco em saúde",
    "Authored scientific articles and supervised undergraduate students": "Autoria de artigos científicos e orientação de estudantes de graduação",
    "Managed district-level nutrition programmes; coordinated with SMI, HIV, TB departments": "Gestão de programas distritais de nutrição; coordenação com os departamentos de SMI, HIV e TB",
    "Led research activities; focal point for the Konzo Disease Mitigation Program": "Liderança de atividades de pesquisa; ponto focal do Programa de Mitigação da Doença Konzo",
    "Focal Point for Nutrition and Food Security Research (SETSAN) in Zambezia": "Ponto Focal de Pesquisa em Nutrição e Segurança Alimentar (SETSAN) na Zambézia",

    // --- Consultancies: titles ---
    "Real-World Evidence Consultant": "Consultor em Evidência do Mundo Real (RWE)",
    "Scientific & Epidemiological Consultant — Influenza Vaccination Impact": "Consultor Científico e Epidemiológico — Impacto da Vacinação contra Influenza",
    "Scientific & Epidemiological Consultant — Nirmatrelvir/Ritonavir (NMV/r)": "Consultor Científico e Epidemiológico — Nirmatrelvir/Ritonavir (NMV/r)",
    "Scientific & Data Science Consultant — TQT Project": "Consultor Científico e de Ciência de Dados — Projeto TQT",
    "Technical Consultant in Health (Epidemiologist / Data Scientist)": "Consultor Técnico em Saúde (Epidemiologista / Cientista de Dados)",
    "Technical Health Consultant (Epidemiologist / Data Scientist)": "Consultor Técnico em Saúde (Epidemiologista / Cientista de Dados)",

    // --- Consultancies: orgs ---
    "Precision Data Engineering & Data Science, São Paulo, Brazil": "Precision Data Engineering & Data Science, São Paulo, Brasil",
    "Brazilian Ministry of Health & Pan American Health Organization": "Ministério da Saúde do Brasil e Organização Pan-Americana da Saúde",
    "Brazilian Ministry of Health": "Ministério da Saúde do Brasil",
    "Primary Health Care COVID-19 Response Project, Salvador (BA) & Rio de Janeiro (RJ), Brazil": "Projeto de Resposta à COVID-19 na Atenção Primária à Saúde, Salvador (BA) e Rio de Janeiro (RJ), Brasil",
    "PAHO/WHO, Brasília, Brazil": "OPAS/OMS, Brasília, Brasil",

    // --- Consultancies: bullets ---
    "End-to-end RWE studies for global pharmaceutical clients using Brazilian public-health data (DATASUS/SUS)": "Estudos de RWE de ponta a ponta para clientes farmacêuticos globais usando dados públicos de saúde do Brasil (DATASUS/SUS)",
    "Patient journeys, treatment patterns, and clinical outcomes across rare diseases, autoimmune conditions, and biologic therapies": "Jornadas de pacientes, padrões de tratamento e desfechos clínicos em doenças raras, condições autoimunes e terapias biológicas",
    "Study protocol design, Data Analysis Plans & Shell Tables, regression and statistical modelling, SAP review, and medical writing": "Desenho de protocolos de estudo, Planos de Análise de Dados e Shell Tables, modelagem estatística e de regressão, revisão de SAP e redação médica",
    "Nationwide evaluation of the impact of influenza vaccination on hospitalisations and deaths in Brazil": "Avaliação nacional do impacto da vacinação contra influenza nas hospitalizações e óbitos no Brasil",
    "Burden-of-disease estimation, vaccine-effectiveness parameters, and epidemiological modelling": "Estimativa de carga de doença, parâmetros de efetividade vacinal e modelagem epidemiológica",
    "Assessing alternative vaccination-timing strategies across regions and age groups to inform the PNI": "Avaliação de estratégias alternativas de calendário vacinal por regiões e faixas etárias para subsidiar o PNI",
    "Nationwide evaluation of early NMV/r treatment and risk reduction for progression to SARS within 28 days": "Avaliação nacional do tratamento precoce com NMV/r e redução do risco de progressão para SRAG em 28 dias",
    "Target trial emulation and DAG-based causal inference with linked SUS databases": "Emulação de ensaio-alvo (target trial) e inferência causal baseada em DAG com bases vinculadas do SUS",
    "Multisite intervention on testing, e-health and telemonitoring in socioeconomically vulnerable neighbourhoods": "Intervenção multicêntrica de testagem, e-saúde e telemonitoramento em bairros socioeconomicamente vulneráveis",
    "Led epidemiological data analysis, data-quality assessment, dashboards, and reporting": "Liderança da análise de dados epidemiológicos, avaliação da qualidade dos dados, dashboards e relatórios",
    "Technical consulting to the Ministry of Health on COVID-19 surveillance indicators and epidemiological analyses": "Consultoria técnica ao Ministério da Saúde sobre indicadores de vigilância da COVID-19 e análises epidemiológicas",
    "Technical notes, weekly situation reports, and national monitoring dashboards": "Notas técnicas, boletins semanais de situação e painéis nacionais de monitoramento",
    "Spatial epidemiology, nowcasting/forecasting, and predictive modelling for respiratory diseases": "Epidemiologia espacial, nowcasting/previsão e modelagem preditiva para doenças respiratórias",
    "Scientific publication and open-source implementation (machine learning for meningitis surveillance)": "Publicação científica e implementação open-source (machine learning para vigilância de meningite)",

    // --- Education: badges ---
    "Current": "Atual",
    "Completed": "Concluído",
    "In Progress": "Em andamento",

    // --- Education: degrees ---
    "Postdoctoral Researcher in Health Data Science": "Pesquisador de Pós-Doutorado em Ciência de Dados em Saúde",
    "Ph.D. in Public Health – Epidemiology": "Doutorado em Saúde Pública – Epidemiologia",
    "Master's in Public Health – Epidemiology": "Mestrado em Saúde Pública – Epidemiologia",
    "MBA in Data Science & Analytics": "MBA em Data Science & Analytics",
    "MBA in Artificial Intelligence & Big Data": "MBA em Inteligência Artificial & Big Data",
    "MBA in Project Management": "MBA em Gestão de Projetos",
    "Specialization in Health Economics & Management (HTA focus)": "Especialização em Economia e Gestão em Saúde (foco em ATS)",
    "PGDip in Public Health (Monitoring, Evaluation & Strategic Information)": "Pós-Graduação em Saúde Pública (Monitoramento, Avaliação e Informação Estratégica)",
    "Bachelor's in Economics": "Bacharelado em Economia",
    "Bachelor's in Human Nutrition": "Bacharelado em Nutrição Humana",

    // --- Education: institutions ---
    "University of São Paulo (USP), Brazil": "Universidade de São Paulo (USP), Brasil",
    "Federal University of Bahia (UFBA), Brazil": "Universidade Federal da Bahia (UFBA), Brasil",
    "University of São Paulo (USP-Esalq), Brazil": "Universidade de São Paulo (USP-Esalq), Brasil",
    "ICMC – University of São Paulo, Brazil": "ICMC – Universidade de São Paulo, Brasil",
    "University of Campinas (UNICAMP), Brazil": "Universidade Estadual de Campinas (UNICAMP), Brasil",
    "Federal University of Bahia (UFBA-ISC), Brazil": "Universidade Federal da Bahia (UFBA-ISC), Brasil",
    "Catholic University of Brasília (UCB/DF), Brazil": "Universidade Católica de Brasília (UCB/DF), Brasil",
    "Lúrio University, Mozambique (Exchange at Federal University of Viçosa, Brazil)": "Universidade Lúrio, Moçambique (Intercâmbio na Universidade Federal de Viçosa, Brasil)",

    // --- Education: thesis ---
    "Predictive Modelling of Stillbirths and Neonatal Deaths Using Multi-Country Cohorts": "Modelagem Preditiva de Natimortos e Óbitos Neonatais Usando Coortes Multinacionais",
    "Gestational weight gain and its effects on fetal growth, neonatal outcomes, and maternal mental health: Integration of Machine Learning and Generalized Estimating Equations in two Brazilian cohorts": "Ganho de peso gestacional e seus efeitos no crescimento fetal, desfechos neonatais e saúde mental materna: integração de Machine Learning e Equações de Estimação Generalizadas em duas coortes brasileiras",
    "Influence of Food Environments on Premature Cardiovascular Mortality in Brazil": "Influência dos Ambientes Alimentares na Mortalidade Cardiovascular Prematura no Brasil",
    "Development of a predictive model for low birth weight using machine learning algorithms": "Desenvolvimento de um modelo preditivo para baixo peso ao nascer usando algoritmos de machine learning",
    "Machine learning models for fetal weight estimation based on ultrasound biometry": "Modelos de machine learning para estimativa de peso fetal com base em biometria ultrassonográfica",
    "Application of project management methodologies in longitudinal epidemiological research: a proposed governance framework": "Aplicação de metodologias de gestão de projetos em pesquisa epidemiológica longitudinal: proposta de um modelo de governança",
    "Health Technology Assessment of Nirmatrelvir/Ritonavir (Paxlovid) for severe COVID-19: evidence for SUS incorporation": "Avaliação de Tecnologia em Saúde do Nirmatrelvir/Ritonavir (Paxlovid) para COVID-19 grave: evidências para incorporação no SUS",
    "Ethics and justice in the implementation of big data algorithms in healthcare: focus on AI": "Ética e justiça na implementação de algoritmos de big data na saúde: foco em IA",
    "Impact of cash-transfer programmes on poverty reduction and its externalities: the case of Bolsa Família": "Impacto dos programas de transferência de renda na redução da pobreza e suas externalidades: o caso do Bolsa Família",
    "Socioeconomic Profile and Lifestyle in Patients with Type II Diabetes Mellitus Treated at the Central Hospital": "Perfil Socioeconômico e Estilo de Vida em Pacientes com Diabetes Mellitus Tipo II Atendidos no Hospital Central",

    // --- Education: meta ---
    "Supervisors: Eric Ohuma and Joe Akuze": "Supervisores: Eric Ohuma e Joe Akuze",
    "Visiting fellowship at LSHTM (Advisor: Eric Ohuma) | Advisor: Patrícia H. C. Rondó | Co-advisor: Alexandre D. P. Chiavegatto Filho | FAPESP Fellow": "Estágio de pesquisa na LSHTM (Orientador: Eric Ohuma) | Orientadora: Patrícia H. C. Rondó | Coorientador: Alexandre D. P. Chiavegatto Filho | Bolsista FAPESP",
    "Advisor: Rita de Cássia Ribeiro Silva | CAPES Fellow": "Orientadora: Rita de Cássia Ribeiro Silva | Bolsista CAPES",
    "Advisor: Francielly Almeida": "Orientadora: Francielly Almeida",
    "Advisor: Ricardo Cerri": "Orientador: Ricardo Cerri",
    "Advisor: Fabiana Da Silva Podeleski": "Orientadora: Fabiana Da Silva Podeleski",
    "Advisor: Augusto Cesar Sousa Raimundo": "Orientador: Augusto Cesar Sousa Raimundo",
    "Advisor: Adriana Galdino Batista Pereira": "Orientadora: Adriana Galdino Batista Pereira",
    "Advisor: Mateus Silva de Paiva": "Orientador: Mateus Silva de Paiva",
    "Advisor: David Comala | CAPES/AULP Fellow": "Orientador: David Comala | Bolsista CAPES/AULP",

    // --- Grants ---
    "Doctoral Fellowship — FAPESP": "Bolsa de Doutorado — FAPESP",
    "Research Internship Abroad Fellowship — BEPE-FAPESP": "Bolsa de Estágio de Pesquisa no Exterior — BEPE-FAPESP",
    "CNPq Grant — National Research Council of Brazil": "Auxílio CNPq — Conselho Nacional de Desenvolvimento Científico e Tecnológico",
    "CNPq Collaboration with CIDACS/FIOCRUZ": "Colaboração CNPq com CIDACS/FIOCRUZ",
    "CAPES Master's Scholarship": "Bolsa de Mestrado CAPES",
    "University of São Paulo, Brazil": "Universidade de São Paulo, Brasil",
    "The Influence of Gestational Weight Gain on Fetal Growth and Neonatal Outcomes: Araraquara Cohort Study": "A Influência do Ganho de Peso Gestacional no Crescimento Fetal e Desfechos Neonatais: Estudo de Coorte de Araraquara",
    "Research on Gestational Weight Gain Using Machine Learning Approaches": "Pesquisa sobre Ganho de Peso Gestacional Usando Abordagens de Machine Learning",
    "GAS-Brazil Study: Algorithmic Generalization in Health Across the Five Regions": "Estudo GAS-Brasil: Generalização Algorítmica em Saúde nas Cinco Regiões",
    "Influence of Air Temperature and Heat Waves on Nutritional Status and Child Feeding Practices in Brazil": "Influência da Temperatura do Ar e das Ondas de Calor no Estado Nutricional e nas Práticas Alimentares Infantis no Brasil",
    "Influence of Food Environments on Premature Mortality from Cardiovascular Diseases in Brazil": "Influência dos Ambientes Alimentares na Mortalidade Prematura por Doenças Cardiovasculares no Brasil",
    "Grant 2023/07936-3 · R$ 120,000 · Advisor: Patrícia H. C. Rondó": "Processo 2023/07936-3 · R$ 120.000 · Orientadora: Patrícia H. C. Rondó",
    "Grant 2024/18309-2 · £22,800 · Supervisor: Eric Ohuma": "Processo 2024/18309-2 · £22.800 · Supervisor: Eric Ohuma",
    "Total budget R$ 275,389.70": "Orçamento total R$ 275.389,70",
    "Total budget R$ 509,480.00": "Orçamento total R$ 509.480,00",
    "Total budget R$ 36,000 · Advisor: Rita de Cássia Ribeiro Silva": "Orçamento total R$ 36.000 · Orientadora: Rita de Cássia Ribeiro Silva",

    // --- Teaching ---
    "Instructor (Post-Graduate) — HNT-5707, Methods for the Assessment of Nutritional Status of Populations": "Docente (Pós-Graduação) — HNT-5707, Métodos para Avaliação do Estado Nutricional de Populações",
    "Instructor — Epidemiological Data Analysis in R": "Instrutor — Análise de Dados Epidemiológicos em R",
    "Statistical Methods in Epidemiology (SME)": "Métodos Estatísticos em Epidemiologia (SME)",
    "Undergraduate Supervision": "Orientação de Graduação",
    "London School of Hygiene & Tropical Medicine, UK": "London School of Hygiene & Tropical Medicine, Reino Unido",
    "Lúrio University, Mozambique": "Universidade Lúrio, Moçambique",
    "Co-taught with Prof. Patrícia H. C. Rondó and Prof. Wolney Lisboa Conde (weekly 4-hour sessions)": "Ministrada em conjunto com a Profa. Patrícia H. C. Rondó e o Prof. Wolney Lisboa Conde (sessões semanais de 4 horas)",
    "Lectures and practicals on anthropometry, biomarkers, survey methods, and R-based epidemiological analysis": "Aulas teóricas e práticas sobre antropometria, biomarcadores, métodos de inquérito e análise epidemiológica em R",
    "Hands-on sessions on data cleaning, visualisation, regression modelling, and reproducible workflows (R Markdown, Git)": "Sessões práticas sobre limpeza de dados, visualização, modelagem de regressão e fluxos de trabalho reprodutíveis (R Markdown, Git)",
    "Advanced training in statistical methods for epidemiology, applied in teaching and practical sessions": "Formação avançada em métodos estatísticos para epidemiologia, aplicada em ensino e sessões práticas",
    "Titina Da Deolinda Mirrione — Food consumption and nutritional status of children in Muatala (2017)": "Titina Da Deolinda Mirrione — Consumo alimentar e estado nutricional de crianças em Muatala (2017)",
    "Quinho Zaona Muxirima — Hygiene-sanitary conditions in take-away food establishments in Nampula (2016)": "Quinho Zaona Muxirima — Condições higiênico-sanitárias em estabelecimentos de comida para viagem em Nampula (2016)",
    "Geraldo Bartolomeu Mateus — Nutritional status and eating habits in adolescents in Nampula (2016)": "Geraldo Bartolomeu Mateus — Estado nutricional e hábitos alimentares em adolescentes em Nampula (2016)",

    // --- Editorial ---
    "Editorial Board": "Conselho Editorial",
    "Journal Reviewer": "Revisor de Periódicos",
    "Awards": "Prêmios",
    "Epidemiology International Journal (EIJ) — 2022–Present": "Epidemiology International Journal (EIJ) — 2022–Atual",
    "& others": "e outros",
    "Best Employee of the Maganja District — 2019 (Government of Maganja, Zambezia, Mozambique)": "Melhor Funcionário do Distrito da Maganja — 2019 (Governo da Maganja, Zambézia, Moçambique)",

    // --- Skills: category headings ---
    "Programming & Data": "Programação e Dados",
    "Machine Learning & AI": "Machine Learning e IA",
    "Statistics & Epidemiology": "Estatística e Epidemiologia",
    "Languages": "Idiomas",
    "Research Methods": "Métodos de Pesquisa",
    "Affiliations": "Afiliações",

    // --- Skills: items ---
    "Neural Networks": "Redes Neurais",
    "Ensemble Methods": "Métodos Ensemble",
    "Bayesian Statistics": "Estatística Bayesiana",
    "Logistic Regression": "Regressão Logística",
    "Survival Analysis": "Análise de Sobrevivência",
    "Spatial Analysis": "Análise Espacial",
    "Time Series (ARIMA, Prophet)": "Séries Temporais (ARIMA, Prophet)",
    "Meta-Analysis": "Meta-análise",
    "Causal Inference": "Inferência Causal",
    "Portuguese (Native)": "Português (Nativo)",
    "English (Proficient)": "Inglês (Proficiente)",
    "Spanish (Basic)": "Espanhol (Básico)",
    "French (Basic)": "Francês (Básico)",
    "Cohort Studies": "Estudos de Coorte",
    "Systematic Review": "Revisão Sistemática",
    "DAG-based Inference": "Inferência baseada em DAG",
    "Target Trial Emulation": "Emulação de Ensaio-Alvo",
    "UFMS Research Group": "Grupo de Pesquisa da UFMS",

    // --- Publications: tabs & status ---
    "Published": "Publicados",
    "Under Review / Submitted": "Em Revisão / Submetidos",
    "Under Review": "Em Revisão",
    "Submitted": "Submetido",
    "Accepted (28 May 2026)": "Aceito (28 de maio de 2026)",
    "Accepted (30 Apr 2026)": "Aceito (30 de abril de 2026)",
    "Revision": "Revisão",
    "Revision in progress": "Revisão em andamento",
    "Revisions requested": "Revisões solicitadas",
    "Under peer review": "Em revisão por pares",
    "Under review": "Em revisão",
    "Submitted (23 Dec 2025)": "Submetido (23 de dezembro de 2025)",
    "Under peer review (consortium member)": "Em revisão por pares (membro do consórcio)",

    // --- Footer ---
    "Designed & Built by Audêncio Victor © 2026": "Concebido e desenvolvido por Audêncio Victor © 2026"
  };

  const norm = (s) => s.replace(/\s+/g, ' ').trim();

  // Paragraphs with inline markup (<strong>/<em>) are swapped via innerHTML.
  const richPT = [
    "Sou epidemiologista, cientista de dados, economista e nutricionista de saúde pública, atuando em saúde materna e neonatal e em machine learning aplicado a grandes bases de dados em saúde. Atualmente sou <strong>Pesquisador em Ciência de Dados em Saúde</strong> na <strong>London School of Hygiene & Tropical Medicine (LSHTM)</strong>, Universidade de Londres, onde contribuo para um projeto financiado pelo Wellcome Trust sobre modelagem preditiva de natimortos e óbitos neonatais na África Subsaariana, leciono a disciplina de pós-graduação Métodos Estatísticos em Epidemiologia e oriento dissertações de mestrado. Também sou <strong>Pesquisador Visitante no PROADI-SUS, Hospital Israelita Albert Einstein</strong> (São Paulo), conduzindo pesquisa metodológica sobre vigilância de doenças crônicas não transmissíveis, estratégias multimodais de inquéritos de saúde e modelagem preditiva com dados nacionais de vigilância.",
    "Sou <strong>Doutor em Saúde Pública – Epidemiologia</strong> pela Universidade de São Paulo (USP), com estágio de pesquisa na LSHTM. Tenho também Mestrado em Epidemiologia pela Universidade Federal da Bahia (UFBA), Bacharelado em Nutrição pela Universidade Lúrio e Pós-Graduação em Saúde Pública (Monitoramento, Avaliação e Informação Estratégica, UFBA). Concluí MBAs em Data Science & Analytics (USP-Esalq), Inteligência Artificial & Big Data (ICMC-USP) e Gestão de Projetos (USP-Esalq), além de uma especialização em Economia da Saúde & ATS (UNICAMP, em andamento).",
    "Profissionalmente, atuei como Consultor Técnico (Epidemiologista e Cientista de Dados) na <strong>Organização Mundial da Saúde (OPAS/OMS)</strong>, apoiando o Ministério da Saúde do Brasil com análise de dados e orientações de política sobre a COVID-19. Na Secretaria de Estado da Saúde de São Paulo, realizei análises espaciais, previsão de doenças (meningite, influenza, COVID-19) e modelagem preditiva. Como Curador Científico e Analista de Dados no Pacto Contra a Fome, traduzi evidências complexas em insights acionáveis para a política nacional de segurança alimentar. Anteriormente, trabalhei como nutricionista no Ministério da Saúde de Moçambique, liderando programas distritais de nutrição na Maganja da Costa e contribuindo para estudos nacionais de desnutrição com o UNICEF e o Programa Mundial de Alimentos (PMA).",
    "Sou membro ativo de grupos de pesquisa, incluindo o LABDAPS (USP), o MARCH Centre (LSHTM), a Rede CoVida e o grupo de Epidemiologia, Estatística e Matemática Aplicada da UFMS, e atuo como revisor de diversos periódicos nacionais e internacionais. Minha pesquisa concentra-se em métodos quantitativos aplicados à saúde pública — estatística descritiva, inferencial e bayesiana, modelagem matemática e abordagens preditivas de machine learning. No trabalho diário, utilizo SPSS, Stata, R e Python, além de Git/GitHub, R Markdown, LaTeX, Quarto, MLflow, REDCap e KoBoToolbox para apoiar a pesquisa reprodutível.",
    "Estou sempre aberto a discutir colaborações de pesquisa, oportunidades de consultoria e projetos de ciência de dados em saúde pública. Sinta-se à vontade para entrar em contato. <em>Referências disponíveis mediante solicitação.</em>"
  ];

  const richEls = Array.from(document.querySelectorAll('#about .about-text > p, #contact .section-container > p'));
  const richData = richEls.map((el, i) => ({ el: el, en: el.innerHTML, pt: richPT[i] }));
  richEls.forEach((el) => el.setAttribute('data-rich', ''));

  // Collect translatable text nodes (skip scripts, SVGs, rich paragraphs, the toggle button).
  const skipTags = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 };
  const items = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function (n) {
      if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const p = n.parentElement;
      if (!p || skipTags[p.tagName]) return NodeFilter.FILTER_REJECT;
      if (p.closest('svg')) return NodeFilter.FILTER_REJECT;
      if (p.closest('[data-rich]')) return NodeFilter.FILTER_REJECT;
      if (p.id === 'lang-toggle') return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  let node;
  while ((node = walker.nextNode())) {
    const key = norm(node.nodeValue);
    if (dict[key]) items.push({ node: node, en: node.nodeValue, key: key });
  }

  const titleEN = document.title;
  const titlePT = 'Audêncio Victor, PhD — Epidemiologista e Cientista de Dados';

  function apply(lang) {
    if (lang === 'pt') {
      items.forEach((o) => {
        const m = o.en.match(/^(\s*)([\s\S]*?)(\s*)$/);
        o.node.nodeValue = m[1] + dict[o.key] + m[3];
      });
      richData.forEach((o) => { o.el.innerHTML = o.pt; });
      document.documentElement.lang = 'pt-BR';
      document.title = titlePT;
    } else {
      items.forEach((o) => { o.node.nodeValue = o.en; });
      richData.forEach((o) => { o.el.innerHTML = o.en; });
      document.documentElement.lang = 'en';
      document.title = titleEN;
    }
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = (lang === 'pt') ? 'EN' : 'PT';
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
  }

  let saved = 'en';
  try { saved = localStorage.getItem('site-lang') || 'en'; } catch (e) {}
  apply(saved);

  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = document.documentElement.lang.indexOf('pt') === 0 ? 'en' : 'pt';
      apply(next);
    });
  }
})();
