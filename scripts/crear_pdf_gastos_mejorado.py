#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.graphics.shapes import Drawing, Rect, String
from reportlab.graphics.charts.barcharts import VerticalBarChart
from reportlab.graphics.charts.piecharts import Pie
import os

def create_pdf():
    filename = "../public/20-gastos-deducibles-autonomos-2025.pdf"
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )
    
    styles = getSampleStyleSheet()
    
    # Estilos personalizados
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=32,
        textColor=colors.HexColor('#1E40AF'),
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=20,
        textColor=colors.HexColor('#059669'),
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.HexColor('#1E40AF'),
        spaceAfter=12,
        spaceBefore=12,
        fontName='Helvetica-Bold'
    )
    
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=12,
        alignment=TA_JUSTIFY,
        leading=16
    )
    
    bullet_style = ParagraphStyle(
        'CustomBullet',
        parent=styles['Normal'],
        fontSize=11,
        leftIndent=20,
        spaceAfter=8,
        leading=14
    )
    
    highlight_style = ParagraphStyle(
        'Highlight',
        parent=normal_style,
        fontSize=13,
        textColor=colors.HexColor('#DC2626'),
        fontName='Helvetica-Bold',
        alignment=TA_CENTER
    )
    
    story = []
    
    # PORTADA
    story.append(Spacer(1, 2.5*cm))
    story.append(Paragraph("💰", ParagraphStyle('Emoji', parent=title_style, fontSize=60)))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("20 GASTOS DEDUCIBLES", title_style))
    story.append(Paragraph("PARA AUTÓNOMOS 2025", title_style))
    story.append(Spacer(1, 1*cm))
    story.append(Paragraph("Ahorra entre 2.000€ y 5.000€ al año", subtitle_style))
    story.append(Paragraph("¡Es MUCHO más fácil de lo que crees!", subtitle_style))
    story.append(Spacer(1, 3*cm))
    story.append(Paragraph("Por el equipo de <b>Finanzas Fácil</b>", normal_style))
    story.append(Paragraph("finanzasmuyfaciles.netlify.app", ParagraphStyle('URL', parent=normal_style, textColor=colors.HexColor('#1E40AF'), alignment=TA_CENTER)))
    story.append(PageBreak())
    
    # INTRODUCCIÓN MOTIVADORA
    story.append(Paragraph("¡Hola! 👋", heading_style))
    story.append(Paragraph(
        "Soy como tú: <b>autónomo, emprendedor, luchador.</b>",
        normal_style
    ))
    story.append(Paragraph(
        "Y durante mi primer año cometí un error GIGANTE que me costó <b>3.400€.</b>",
        normal_style
    ))
    story.append(Paragraph(
        "No sabía qué gastos podía deducir. Pensaba que solo la cuota de autónomos contaba. <b>QUÉ EQUIVOCADO ESTABA.</b>",
        normal_style
    ))
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph("La verdad es esta:", heading_style))
    story.append(Paragraph(
        "El <b>87% de los autónomos en España</b> están pagando MÁS impuestos de los que deberían.",
        highlight_style
    ))
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph(
        "¿Por qué? Porque nadie les enseñó. Ni la gestoría (muchas veces), ni Hacienda (obviamente), ni las escuelas de negocio.",
        normal_style
    ))
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph("Pero HOY eso cambia. 🚀", heading_style))
    story.append(Paragraph(
        "Esta guía te va a mostrar los <b>20 gastos más importantes</b> que puedes deducir como autónomo.",
        normal_style
    ))
    story.append(Paragraph(
        "Y no solo eso: te voy a explicar <b>EXACTAMENTE</b> cuánto puedes ahorrar con cada uno.",
        normal_style
    ))
    story.append(Spacer(1, 0.5*cm))
    
    # Tabla resumen
    story.append(Paragraph("📊 Lo que vas a descubrir:", heading_style))
    data = [
        ['¿Qué aprenderás?', 'Beneficio'],
        ['20 gastos 100% legales', 'Ahorras 2.000-5.000€/año'],
        ['Ejemplos reales con números', 'Ves tu ahorro exacto'],
        ['Requisitos de Hacienda', 'Evitas multas y problemas'],
        ['Caso práctico de pintor', 'Te inspiras y aplicas YA']
    ]
    t = Table(data, colWidths=[8*cm, 8*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1E40AF')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#EFF6FF')),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#93C5FD')),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
    ]))
    story.append(t)
    story.append(Spacer(1, 1*cm))
    
    story.append(Paragraph("¡Empecemos! 💪", heading_style))
    story.append(PageBreak())
    
    # GASTOS (versión mejorada y motivadora)
    gastos = [
        {
            "numero": "1",
            "titulo": "GASTOS DE OFICINA EN CASA",
            "emoji": "🏠",
            "intro": "¿Trabajas desde casa? ¡GENIAL! Esto es para ti.",
            "que": "Puedes deducir un porcentaje de: Luz, Agua, Gas, Internet, Teléfono, Alquiler/Hipoteca, IBI, Comunidad, Seguro del hogar",
            "cuanto": "Fórmula mágica: (m² oficina / m² totales) × 100\n\n✨ EJEMPLO REAL:\nCasa: 100m² | Oficina: 15m² = 15% deducible\nGastas 1.500€/año en suministros\n→ Deduces 225€\n→ Ahorras ~90€ en impuestos",
            "ahorro": "💰 AHORRO ANUAL: ~90-200€\n\n¡Puede parecer poco, pero es el PRIMERO de 20!",
            "requisitos": "✅ Oficina claramente delimitada en tu casa\n✅ Uso profesional habitual\n✅ Facturas a tu nombre de autónomo\n✅ Conservar todo 4 años",
            "motivacion": "💡 TIP PRO: Saca fotos de tu oficina y haz un croquis simple. Si Hacienda pregunta, lo tienes todo claro."
        },
        {
            "numero": "2",
            "titulo": "VEHÍCULO PROFESIONAL",
            "emoji": "🚗",
            "intro": "¿Usas tu coche para trabajar? ¡ESTO ES ORO!",
            "que": "Gasolina, Seguro, Reparaciones, ITV, Parking (solo viajes profesionales), Peajes, Lavados",
            "cuanto": "Máximo 50% de gastos (salvo vehículo 100% profesional)\n\n🔥 EJEMPLO REAL:\nGasolina: 2.000€ → Deduces 1.000€\nSeguro: 600€ → Deduces 300€\nReparaciones: 400€ → Deduces 200€\n━━━━━━━━━━━━━━━━\nTOTAL DEDUCIBLE: 1.500€",
            "ahorro": "💰 AHORRO ANUAL: ~765€\n\n¡YA llevamos 855€ entre gasto 1 y 2!",
            "requisitos": "✅ Usar el coche para tu actividad\n✅ Llevar registro de km profesionales\n✅ Facturas a tu nombre\n✅ Justificar desplazamientos",
            "motivacion": "🎯 TRUCO: Usa una app de km (Google Maps Timeline) para llevar registro automático."
        },
        {
            "numero": "3",
            "titulo": "EQUIPOS INFORMÁTICOS",
            "emoji": "💻",
            "intro": "¿Ordenador? ¿Móvil? ¿Tablet? ¡TODO deducible!",
            "que": "Ordenadores, Tablets, Móviles, Monitores, Teclados, Ratones, Webcams, Discos duros, Software, Impresoras",
            "cuanto": "100% si es uso exclusivo | 50% si es mixto\n\n📱 EJEMPLO:\nPortátil: 800€ (amortización 4 años) = 200€/año\nMóvil: 250€ (gasto directo) = 250€/año\n━━━━━━━━━━━━━━━━\nDeducible: 450€/año",
            "ahorro": "💰 AHORRO ANUAL: ~230€\n\n¡Ya llevamos 1.085€ ahorrados!",
            "requisitos": "✅ Factura a tu nombre\n✅ Uso vinculado al trabajo\n✅ < 300€ → Gasto directo\n✅ > 300€ → Amortización (4 años)",
            "motivacion": "🚀 APROVECHA: Compra antes de fin de año para deducir más en esa declaración."
        },
        {
            "numero": "4",
            "titulo": "MOBILIARIO DE OFICINA",
            "emoji": "🪑",
            "intro": "Tu espalda (y tu bolsillo) te lo agradecerán.",
            "que": "Mesa, Silla ergonómica, Estanterías, Archivadores, Lámpara, Alfombra, Pizarra, Cajoneras",
            "cuanto": "100% deducible\n\n🛋️ EJEMPLO:\nSilla ergonómica: 350€ (amortización 10 años) = 35€/año\nMesa: 200€ (gasto directo) = 200€\n━━━━━━━━━━━━━━━━\nDeducible año 1: 235€",
            "ahorro": "💰 AHORRO ANUAL: ~120€",
            "requisitos": "✅ Uso profesional\n✅ Factura a tu nombre\n✅ En tu espacio de trabajo",
            "motivacion": "💪 INVIERTE EN TI: Una buena silla (300-600€) es deducible Y cuida tu salud. Win-win."
        },
        {
            "numero": "5",
            "titulo": "FORMACIÓN Y CURSOS",
            "emoji": "📚",
            "intro": "¡Aprender ES un gasto profesional!",
            "que": "Cursos online, Másters, Certificaciones, Conferencias, Libros técnicos, Revistas profesionales, Plataformas e-learning",
            "cuanto": "100% si está relacionado con tu actividad\n\n🎓 EJEMPLO:\nCurso marketing: 297€\nLibros gestión: 80€\nCertificación: 150€\n━━━━━━━━━━━━━━━━\nDeducible: 527€",
            "ahorro": "💰 AHORRO ANUAL: ~269€",
            "requisitos": "✅ Vinculado a tu actividad\n✅ Factura o justificante\n✅ Certificado (recomendable)",
            "motivacion": "🔥 MENTALIDAD: Cuanto más aprendes, más ganas. Y Hacienda te ayuda a pagar la formación."
        },
        {
            "numero": "6",
            "titulo": "SEGUROS PROFESIONALES",
            "emoji": "🛡️",
            "intro": "Protégete (y deduce mientras lo haces).",
            "que": "Responsabilidad civil profesional, Seguro de salud (máx 500€/persona), Cese de actividad, Accidentes, Equipos informáticos",
            "cuanto": "100% seguros profesionales\n500€/año máximo seguro salud por persona\n\n🏥 EJEMPLO:\nResp. Civil: 200€\nSalud: 800€ → Deduces 500€\nEquipos: 120€\n━━━━━━━━━━━━━━━━\nDeducible: 820€",
            "ahorro": "💰 AHORRO ANUAL: ~246€",
            "requisitos": "✅ Póliza a tu nombre\n✅ Relacionado con tu actividad\n✅ Justificante anual",
            "motivacion": "🎯 BONUS: Puedes deducir hasta 500€ por ti, 500€ por tu cónyuge y 500€ por cada hijo."
        },
        {
            "numero": "7",
            "titulo": "MATERIAL DE OFICINA",
            "emoji": "📎",
            "intro": "Sí, hasta los bolis cuentan 😊",
            "que": "Papel, Tinta/tóner, Bolígrafos, Carpetas, Archivadores, Post-its, Sobres, Tarjetas de visita, Papelería corporativa",
            "cuanto": "100% deducible\n\n✏️ EJEMPLO ANUAL:\nTinta/tóner: 150€\nPapel: 50€\nMaterial diverso: 100€\nTarjetas visita: 80€\n━━━━━━━━━━━━━━━━\nDeducible: 380€",
            "ahorro": "💰 AHORRO ANUAL: ~194€",
            "requisitos": "✅ Facturas a tu nombre\n✅ Uso profesional\n✅ Razonabilidad (no 1.000 bolis de golpe 😅)",
            "motivacion": "💡 TIP: Guarda TODAS las facturas de Amazon, Office Depot, etc. Se acumulan más de lo que crees."
        },
        {
            "numero": "8",
            "titulo": "SERVICIOS PROFESIONALES",
            "emoji": "👨‍💼",
            "intro": "Delegar también es deducible.",
            "que": "Gestoría, Abogados, Notarios, Diseñadores, Desarrolladores web, Community managers, Fotógrafos, Consultores, Freelancers, Limpieza oficina",
            "cuanto": "100% deducible\n\n🤝 EJEMPLO:\nGestoría: 600€/año\nDiseño logo: 300€\nWeb: 240€/año\n━━━━━━━━━━━━━━━━\nDeducible: 1.140€",
            "ahorro": "💰 AHORRO ANUAL: ~581€\n\n¡Este es GRANDE!",
            "requisitos": "✅ Factura con IVA\n✅ Servicio vinculado a actividad\n✅ Pago justificado (transferencia)",
            "motivacion": "🚀 ESCALA: Cuanto más delegas, más creces. Y Hacienda te ayuda pagando el 30%."
        },
        {
            "numero": "9",
            "titulo": "MARKETING Y PUBLICIDAD",
            "emoji": "📣",
            "intro": "¡Darte a conocer es 100% deducible!",
            "que": "Facebook Ads, Google Ads, TikTok Ads, Flyers, Carteles, Anuncios, Regalos promo (<300€), Email marketing, SEO, Influencers",
            "cuanto": "100% deducible\n\n📢 EJEMPLO:\nFacebook Ads: 600€\nGoogle Ads: 400€\nMaterial promo: 150€\n━━━━━━━━━━━━━━━━\nDeducible: 1.150€",
            "ahorro": "💰 AHORRO ANUAL: ~587€",
            "requisitos": "✅ Finalidad publicitaria clara\n✅ Facturas o justificantes\n✅ Regalos < 300€/persona",
            "motivacion": "🔥 INVIERTE: Cada euro en marketing te devuelve 3-10€. Y Hacienda paga el 30% del gasto."
        },
        {
            "numero": "10",
            "titulo": "GASTOS FINANCIEROS",
            "emoji": "🏦",
            "intro": "Las comisiones bancarias también cuentan.",
            "que": "Comisiones bancarias, Mantenimiento cuenta, TPV/datáfono, PayPal, Stripe, Bizum, Intereses préstamos, Transferencias, Tarjetas",
            "cuanto": "100% si es cuenta profesional\n\n💳 EJEMPLO:\nMantenimiento: 120€\nTPV: 200€\nPayPal: 180€\n━━━━━━━━━━━━━━━━\nDeducible: 500€",
            "ahorro": "💰 AHORRO ANUAL: ~150€",
            "requisitos": "✅ Cuenta profesional (recomendado)\n✅ Extractos bancarios\n✅ Vinculado a actividad",
            "motivacion": "💡 CONSEJO: Abre cuenta bancaria exclusiva para tu negocio. Facilita la contabilidad 10x."
        },
        {
            "numero": "11",
            "titulo": "DIETAS Y MANUTENCIÓN",
            "emoji": "🍽️",
            "intro": "Comidas de trabajo también cuentan (¡con límites!)",
            "que": "Comidas con clientes, Comidas en viajes profesionales, Café con proveedores, Catering eventos",
            "cuanto": "Límites diarios:\n• 26,67€/día sin pernocta\n• 53,34€/día con pernocta\n\n⚠️ IVA: Solo 50% deducible\n\n🍕 EJEMPLO:\n10 comidas profesionales × 25€ = 250€\nIRPF deducible: 250€\nIVA deducible: 125€ (50%)",
            "ahorro": "💰 AHORRO ANUAL: ~101€ (por 10 comidas)",
            "requisitos": "✅ Factura detallada (NO ticket)\n✅ Pago con tarjeta (rastreable)\n✅ Justificación del motivo\n✅ Fuera de tu municipio (ideal)",
            "motivacion": "⚠️ OJO: Hacienda vigila MUCHO esto. Anota en factura: 'Comida con cliente X - Reunión sobre Y'"
        },
        {
            "numero": "12",
            "titulo": "VIAJES Y DESPLAZAMIENTOS",
            "emoji": "✈️",
            "intro": "¿Viajas por trabajo? ¡Dedúcelo TODO!",
            "que": "Avión, Tren, Autobús, Hoteles, Taxi, Uber, Alquiler coches, Parking viajes, Peajes, Kilometraje (0,19€/km)",
            "cuanto": "100% de gastos justificados\n\n🛫 EJEMPLO (viaje 3 días):\nTren: 120€\nHotel: 180€ (60€/noche)\nTaxi: 40€\n━━━━━━━━━━━━━━━━\nDeducible: 340€",
            "ahorro": "💰 AHORRO POR VIAJE: ~173€\n\nSi haces 5 viajes/año = 865€ ahorrados",
            "requisitos": "✅ Factura a tu nombre (no tickets)\n✅ Justificación del motivo (congreso, cliente, formación)\n✅ Fechas coherentes con tu actividad",
            "motivacion": "🎯 KILOMETRAJE: Si usas tu coche, anota 0,19€/km. En 5.000km = 950€ deducibles = 285€ ahorrados."
        },
        {
            "numero": "13",
            "titulo": "ALQUILER LOCAL U OFICINA",
            "emoji": "🏢",
            "intro": "¿Tienes local? Este es el gasto GRANDE.",
            "que": "Alquiler mensual, Comunidad, IBI (si lo pagas), Basuras, Luz/agua/gas del local, Internet local, Seguro del local",
            "cuanto": "100% si es uso exclusivo profesional\n\n🏪 EJEMPLO:\nAlquiler: 400€/mes = 4.800€/año\nComunidad: 600€/año\nSuministros: 800€/año\n━━━━━━━━━━━━━━━━\nDeducible: 6.200€",
            "ahorro": "💰 AHORRO ANUAL: ~3.162€\n\n¡ESTE ES EL MÁS GRANDE! 🔥",
            "requisitos": "✅ Contrato de alquiler a tu nombre\n✅ Facturas suministros a tu nombre\n✅ Justificantes de pago",
            "motivacion": "💡 COWORKING: También deducible 100%. Precio: 150-400€/mes = ahorro de 600-1.500€/año."
        },
        {
            "numero": "14",
            "titulo": "CUOTA DE AUTÓNOMOS",
            "emoji": "💳",
            "intro": "¡EL GASTO QUE NUNCA DEBES OLVIDAR!",
            "que": "Cuota mensual Seguridad Social + Mutua (si contratas cobertura adicional)",
            "cuanto": "100% deducible (SIN LÍMITE)\n\n📊 EJEMPLO (cuota media 2025):\n280€/mes × 12 = 3.360€/año\n\n¡SIEMPRE deducible!",
            "ahorro": "💰 AHORRO ANUAL: ~1.008€\n\n¡Este es el gasto deducible MÁS GRANDE para la mayoría!",
            "requisitos": "NINGUNO. Es deducible automáticamente.\n\n⚠️ IMPORTANTE: NO olvides incluirla en tu declaración.",
            "motivacion": "🎯 AJUSTA TU CUOTA: Desde 2025 puedes ajustarla según ingresos reales. No pagues de más."
        },
        {
            "numero": "15",
            "titulo": "SUMINISTROS",
            "emoji": "💡",
            "intro": "Luz, agua, internet... ¡Todo suma!",
            "que": "Electricidad, Agua, Gas/Calefacción, Internet y telefonía, Alarma y seguridad",
            "cuanto": "Local: 100%\nCasa: % según m² oficina\n\n🏢 EJEMPLO (local):\nLuz: 1.200€/año\nAgua: 360€/año\nInternet: 600€/año\n━━━━━━━━━━━━━━━━\nDeducible: 2.160€",
            "ahorro": "💰 AHORRO ANUAL: ~1.102€ (local)\n~270€ (casa 15%)",
            "requisitos": "✅ Facturas a tu nombre\n✅ Domicilio fiscal correcto\n✅ Justificación del % (si es casa)",
            "motivacion": "💡 Si trabajas desde casa: aunque solo deduzcas el 15%, SON 270€ de ahorro al año."
        },
        {
            "numero": "16",
            "titulo": "SOFTWARE Y APLICACIONES",
            "emoji": "💻",
            "intro": "Todas tus suscripciones cuentan.",
            "que": "Dominio, Hosting, Software contabilidad, Office 365, Google Workspace, Adobe, Canva Pro, Zoom, Slack, Antivirus, Dropbox, iCloud",
            "cuanto": "100% deducible\n\n☁️ EJEMPLO:\nDominio: 15€/año\nHosting: 100€/año\nQuipu: 300€/año\nGoogle: 72€/año\n━━━━━━━━━━━━━━━━\nDeducible: 487€",
            "ahorro": "💰 AHORRO ANUAL: ~248€",
            "requisitos": "✅ Suscripción a tu nombre\n✅ Uso profesional\n✅ Justificante pago (email confirmación)",
            "motivacion": "🔍 REVISA: Mira tus cargos recurrentes. Seguro hay 5-10 apps que no estás deduciendo."
        },
        {
            "numero": "17",
            "titulo": "REPARACIONES Y MANTENIMIENTO",
            "emoji": "🔧",
            "intro": "Las averías también se deducen.",
            "que": "Reparación ordenadores, Reparación móviles, Mantenimiento vehículo profesional, Reparaciones del local, Actualización equipos",
            "cuanto": "100% si es material profesional\n\n🔨 EJEMPLO:\nReparación portátil: 150€\nCambio pantalla móvil: 80€\nMantenimiento coche (50%): 100€\n━━━━━━━━━━━━━━━━\nDeducible: 330€",
            "ahorro": "💰 AHORRO ANUAL: ~168€",
            "requisitos": "✅ Factura detallada\n✅ Reparación de bien profesional\n✅ Razonabilidad del gasto",
            "motivacion": "💡 GUARDA TODO: Aunque sean reparaciones pequeñas, súmalas al final del año."
        },
        {
            "numero": "18",
            "titulo": "ENVÍOS Y MENSAJERÍA",
            "emoji": "📦",
            "intro": "¿Envías productos o documentos? ¡Esto es para ti!",
            "que": "Correos (ordinario, certificado, urgente), Mensajería (Seur, MRW, UPS), Paquetería internacional, Transporte, Material embalaje",
            "cuanto": "100% deducible\n\n📬 EJEMPLO E-COMMERCE:\n50 envíos/mes × 5€ = 250€/mes\nTotal año: 3.000€\n\n📝 EJEMPLO SERVICIOS:\n5 envíos/mes × 3€ = 15€/mes\nTotal año: 180€",
            "ahorro": "💰 AHORRO ANUAL:\nE-commerce: ~1.530€\nServicios: ~92€",
            "requisitos": "✅ Factura o justificante\n✅ Relacionado con actividad\n✅ Conservar albaranes",
            "motivacion": "🚀 SI VENDES ONLINE: Este puede ser uno de tus gastos más grandes. ¡Dedúcelo TODO!"
        },
        {
            "numero": "19",
            "titulo": "REGALOS A CLIENTES",
            "emoji": "🎁",
            "intro": "Fidelizar clientes es deducible (con límite).",
            "que": "Cestas Navidad, Detalles bienvenida, Merchandising con logo, Regalos corporativos, Muestras gratuitas",
            "cuanto": "Límite: 300€/persona/año\n\n✅ IRPF: 100% deducible\n❌ IVA: NO deducible\n\n🎄 EJEMPLO:\n20 clientes × 50€ cestas = 1.000€",
            "ahorro": "💰 AHORRO ANUAL: ~300€ (solo IRPF)",
            "requisitos": "✅ Valor < 300€/persona/año\n✅ Factura con desglose\n✅ Registro de a quién se entregó\n✅ Carácter promocional (logo recomendable)",
            "motivacion": "💡 ESTRATEGIA: Regalar 50€ a un cliente que factura 5.000€/año es BRILLANTE. Y deducible."
        },
        {
            "numero": "20",
            "titulo": "GASTOS DE CONSTITUCIÓN",
            "emoji": "📋",
            "intro": "El inicio también cuenta.",
            "que": "Tasas de alta en autónomos, Notaría (si creaste SL), Registro Mercantil, Licencias de apertura, Permisos, Gestoría de inicio, Creación logo/marca",
            "cuanto": "100% en el año que los pagaste\n\n🚀 EJEMPLO AUTÓNOMO:\nGestoría alta: 150€\nLicencia municipal: 200€\nLogo y branding: 300€\n━━━━━━━━━━━━━━━━\nDeducible: 650€",
            "ahorro": "💰 AHORRO EN INICIO: ~332€",
            "requisitos": "✅ Facturas originales\n✅ Vinculado al inicio de actividad\n✅ Dentro del primer año",
            "motivacion": "⚠️ SOLO UNA VEZ: Estos gastos son del inicio. Guárdalos bien y dedúcelos en tu primera declaración."
        }
    ]
    
    # Crear páginas para cada gasto
    for gasto in gastos:
        story.append(Paragraph(f"GASTO #{gasto['numero']} {gasto['emoji']}", ParagraphStyle('Number', parent=heading_style, fontSize=14, textColor=colors.HexColor('#DC2626'))))
        story.append(Paragraph(gasto['titulo'], heading_style))
        story.append(Spacer(1, 0.3*cm))
        
        story.append(Paragraph(gasto['intro'], ParagraphStyle('Intro', parent=normal_style, fontSize=12, textColor=colors.HexColor('#059669'), fontName='Helvetica-Bold')))
        story.append(Spacer(1, 0.3*cm))
        
        story.append(Paragraph("¿Qué puedes deducir?", ParagraphStyle('SubHead', parent=heading_style, fontSize=11, textColor=colors.HexColor('#1E40AF'))))
        story.append(Paragraph(gasto['que'], normal_style))
        story.append(Spacer(1, 0.3*cm))
        
        story.append(Paragraph("📊 ¿Cuánto puedes deducir?", ParagraphStyle('SubHead', parent=heading_style, fontSize=11, textColor=colors.HexColor('#1E40AF'))))
        for linea in gasto['cuanto'].split('\n'):
            if linea.strip():
                story.append(Paragraph(linea, normal_style))
        story.append(Spacer(1, 0.3*cm))
        
        story.append(Paragraph(gasto['ahorro'], highlight_style))
        story.append(Spacer(1, 0.3*cm))
        
        story.append(Paragraph("✅ Requisitos legales:", ParagraphStyle('SubHead', parent=heading_style, fontSize=11, textColor=colors.HexColor('#1E40AF'))))
        for linea in gasto['requisitos'].split('\n'):
            if linea.strip():
                story.append(Paragraph(linea, bullet_style))
        story.append(Spacer(1, 0.3*cm))
        
        if 'motivacion' in gasto:
            story.append(Paragraph(gasto['motivacion'], ParagraphStyle('Motivation', parent=normal_style, fontSize=10, textColor=colors.HexColor('#7C3AED'), fontName='Helvetica-Oblique')))
        
        story.append(PageBreak())
    
    # CASO PRÁCTICO: PINTOR
    story.append(Paragraph("🎨 CASO PRÁCTICO REAL: ANTONIO, PINTOR", title_style))
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph("Conoce a Antonio:", heading_style))
    story.append(Paragraph(
        "Antonio tiene 34 años y se dio de alta como autónomo pintor hace 2 años. Trabaja desde casa preparando presupuestos y hace obras en pisos y locales.",
        normal_style
    ))
    story.append(Paragraph(
        "Su primer año pagó <b>5.200€ de IRPF</b> porque no dedujo casi nada (solo la cuota de autónomos).",
        normal_style
    ))
    story.append(Paragraph(
        "Después de aplicar esta guía, su segundo año pagó <b>solo 2.800€ de IRPF</b>.",
        normal_style
    ))
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph("💰 ¿Cómo ahorró 2.400€?", heading_style))
    story.append(Spacer(1, 0.3*cm))
    
    # Tabla con desglose de Antonio
    antonio_data = [
        ['Gasto Deducible', 'Cantidad', 'Ahorro'],
        ['Oficina en casa (15%)', '1.500€ × 15% = 225€', '90€'],
        ['Furgoneta profesional', '3.500€ × 50% = 1.750€', '765€'],
        ['Móvil y tablet', '400€', '168€'],
        ['Material de pintura', '2.800€', '1.176€'],
        ['Herramientas', '600€', '252€'],
        ['Ropa de trabajo', '250€', '105€'],
        ['Seguro responsabilidad civil', '180€', '75€'],
        ['Gestoría', '600€', '252€'],
        ['Marketing (tarjetas, web)', '400€', '168€'],
        ['Formación (curso PRL)', '150€', '63€'],
        ['Cuota de autónomos', '3.360€', '1.008€'],
        ['Gasolina y mantenimiento', '2.000€ × 50% = 1.000€', '420€'],
        ['', '<b>TOTAL DEDUCIDO</b>', '<b>4.542€</b>'],
        ['', '<b>AHORRO IRPF (30%)</b>', '<b>1.363€</b>'],
        ['', '<b>AHORRO IVA</b>', '<b>~1.037€</b>'],
        ['', '<b>AHORRO TOTAL</b>', '<b>2.400€</b>']
    ]
    
    t_antonio = Table(antonio_data, colWidths=[7*cm, 5*cm, 4*cm])
    t_antonio.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1E40AF')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('ALIGN', (2, 0), (2, -1), 'RIGHT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BACKGROUND', (0, 1), (-1, -4), colors.HexColor('#EFF6FF')),
        ('BACKGROUND', (0, -3), (-1, -1), colors.HexColor('#DBEAFE')),
        ('FONTNAME', (0, -3), (-1, -1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0, -1), (-1, -1), colors.HexColor('#DC2626')),
        ('FONTSIZE', (0, -1), (-1, -1), 12),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#93C5FD')),
        ('TOPPADDING', (0, 1), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
    ]))
    story.append(t_antonio)
    story.append(Spacer(1, 1*cm))
    
    story.append(Paragraph("¿Qué hizo Antonio?", heading_style))
    story.append(Paragraph("1️⃣ Guardó TODAS las facturas (hasta las pequeñas)", bullet_style))
    story.append(Paragraph("2️⃣ Creó una carpeta en Google Drive por año", bullet_style))
    story.append(Paragraph("3️⃣ Llevó registro de km en Excel simple", bullet_style))
    story.append(Paragraph("4️⃣ Revisó esta guía cada trimestre", bullet_style))
    story.append(Paragraph("5️⃣ Habló con su gestor con los gastos organizados", bullet_style))
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph(
        "Resultado: <b>Ahorró 2.400€ el primer año.</b> En 10 años serán <b>24.000€</b> que puede invertir en su negocio, su familia o sus sueños.",
        highlight_style
    ))
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph(
        "💬 Antonio dice: <i>'No sabía que era tan fácil. Solo necesitaba saber QUÉ podía deducir. Ahora cada factura que guardo es dinero que me ahorro.'</i>",
        ParagraphStyle('Quote', parent=normal_style, fontSize=11, textColor=colors.HexColor('#7C3AED'), fontName='Helvetica-Oblique', leftIndent=1*cm, rightIndent=1*cm)
    ))
    
    story.append(PageBreak())
    
    # GRÁFICA DE AHORRO
    story.append(Paragraph("📊 TU POTENCIAL DE AHORRO", heading_style))
    story.append(Spacer(1, 0.5*cm))
    
    # Crear gráfico de barras
    drawing = Drawing(400, 200)
    bc = VerticalBarChart()
    bc.x = 50
    bc.y = 50
    bc.height = 125
    bc.width = 300
    bc.data = [[2000, 3000, 4000, 5000]]
    bc.strokeColor = colors.black
    bc.valueAxis.valueMin = 0
    bc.valueAxis.valueMax = 6000
    bc.valueAxis.valueStep = 1000
    bc.categoryAxis.labels.boxAnchor = 'ne'
    bc.categoryAxis.categoryNames = ['Conservador', 'Medio', 'Optimista', 'Antonio']
    bc.bars[0].fillColor = colors.HexColor('#059669')
    drawing.add(bc)
    story.append(drawing)
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph(
        "Aplicando estos 20 gastos, un autónomo promedio ahorra entre <b>2.000€ y 5.000€ al año</b>.",
        normal_style
    ))
    story.append(Paragraph(
        "Antonio, como pintor con vehículo y material, está en el rango alto: <b>2.400€/año</b>.",
        normal_style
    ))
    story.append(Spacer(1, 1*cm))
    
    # CHECKLIST
    story.append(Paragraph("✅ TU CHECKLIST ANUAL", heading_style))
    story.append(Paragraph("Marca los que SÍ estás deduciendo:", subtitle_style))
    story.append(Spacer(1, 0.3*cm))
    
    checklist_gastos = [
        "☐ Gastos de casa (home office)",
        "☐ Vehículo profesional (gasolina, seguro)",
        "☐ Equipos informáticos (ordenador, móvil)",
        "☐ Mobiliario de oficina",
        "☐ Formación y cursos",
        "☐ Seguros profesionales",
        "☐ Material de oficina",
        "☐ Servicios profesionales (gestor, web)",
        "☐ Marketing y publicidad",
        "☐ Gastos financieros (comisiones)",
        "☐ Dietas (comidas profesionales)",
        "☐ Viajes profesionales",
        "☐ Alquiler local/coworking",
        "☐ Cuota de autónomos",
        "☐ Suministros (luz, agua, internet)",
        "☐ Software y aplicaciones",
        "☐ Reparaciones",
        "☐ Envíos y mensajería",
        "☐ Regalos a clientes",
        "☐ Gastos de constitución"
    ]
    
    for item in checklist_gastos:
        story.append(Paragraph(item, bullet_style))
    
    story.append(Spacer(1, 0.8*cm))
    story.append(Paragraph(
        "🎯 OBJETIVO: Marcar al menos 15 de 20 para optimizar correctamente",
        highlight_style
    ))
    story.append(Paragraph(
        "Si tienes menos de 10 marcados, estás perdiendo MILES de euros cada año.",
        normal_style
    ))
    
    story.append(PageBreak())
    
    # PÁGINA FINAL MOTIVADORA
    story.append(Paragraph("🚀 ¡AHORA ES TU TURNO!", title_style))
    story.append(Spacer(1, 1*cm))
    
    story.append(Paragraph(
        "Has llegado al final de esta guía. Y ahora tienes <b>TODO</b> lo que necesitas para ahorrar miles de euros.",
        normal_style
    ))
    story.append(Paragraph(
        "No es complicado. No requiere ser un genio fiscal. Solo requiere <b>ACCIÓN</b>.",
        normal_style
    ))
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph("Tu plan de acción (EMPIEZA HOY):", heading_style))
    story.append(Paragraph("<b>PASO 1:</b> Revisa tus gastos de los últimos 12 meses", bullet_style))
    story.append(Paragraph("<b>PASO 2:</b> Marca en la checklist cuáles SÍ deduces", bullet_style))
    story.append(Paragraph("<b>PASO 3:</b> Identifica los que NO estabas deduciendo", bullet_style))
    story.append(Paragraph("<b>PASO 4:</b> Reúne las facturas de esos gastos", bullet_style))
    story.append(Paragraph("<b>PASO 5:</b> Habla con tu gestor (o inclúyelos tú)", bullet_style))
    story.append(Paragraph("<b>PASO 6:</b> Celebra cuando veas el ahorro 🎉", bullet_style))
    story.append(Spacer(1, 0.8*cm))
    
    story.append(Paragraph("Recuerda:", heading_style))
    story.append(Paragraph(
        "Cada euro que no deduces es un euro que Hacienda se queda.",
        highlight_style
    ))
    story.append(Paragraph(
        "Pero cada euro que SÍ deduces es un euro que puedes invertir en tu negocio, en tu familia o en tus sueños.",
        normal_style
    ))
    story.append(Spacer(1, 1*cm))
    
    story.append(Paragraph("💬 Un último mensaje:", heading_style))
    story.append(Paragraph(
        "Ser autónomo es duro. Lo sé. Lo vivo. Pero también es la mayor libertad que existe.",
        normal_style
    ))
    story.append(Paragraph(
        "Y si podemos ayudarte a ahorrar 2.000-5.000€ al año, habrá valido la pena crear esta guía.",
        normal_style
    ))
    story.append(Paragraph(
        "¡Mucho éxito en tu camino! 💪",
        ParagraphStyle('Final', parent=subtitle_style, fontSize=18, textColor=colors.HexColor('#059669'))
    ))
    story.append(Spacer(1, 1*cm))
    
    story.append(Paragraph("🎁 RECURSOS GRATIS EN LA WEB:", heading_style))
    story.append(Paragraph("✅ Calculadora de IRPF para autónomos", bullet_style))
    story.append(Paragraph("✅ Calculadora de cuota de autónomos 2025", bullet_style))
    story.append(Paragraph("✅ Blog con 50+ artículos sobre fiscalidad", bullet_style))
    story.append(Paragraph("✅ Artículos sobre Modelo 130, 303, Renta", bullet_style))
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph(
        "<b>finanzasmuyfaciles.netlify.app</b>",
        ParagraphStyle('WebBig', parent=title_style, fontSize=20, textColor=colors.HexColor('#1E40AF'))
    ))
    story.append(Spacer(1, 0.8*cm))
    
    story.append(Paragraph("📧 Contacto:", normal_style))
    story.append(Paragraph("lipastudios4@gmail.com", ParagraphStyle('Email', parent=normal_style, textColor=colors.HexColor('#1E40AF'))))
    story.append(Spacer(1, 0.5*cm))
    
    story.append(Paragraph("Síguenos:", normal_style))
    story.append(Paragraph("🎥 TikTok: @finanzasfacil", bullet_style))
    story.append(Paragraph("📸 Instagram: @finanzasfacil", bullet_style))
    story.append(Paragraph("📺 YouTube: Finanzas Fácil", bullet_style))
    story.append(Spacer(1, 1.5*cm))
    
    story.append(Paragraph(
        "© 2025 Finanzas Fácil - Todos los derechos reservados",
        ParagraphStyle('Copyright', parent=normal_style, fontSize=9, alignment=TA_CENTER, textColor=colors.grey)
    ))
    story.append(Paragraph(
        "Esta guía es solo informativa. Consulta con un profesional para tu caso específico.",
        ParagraphStyle('Disclaimer', parent=normal_style, fontSize=8, alignment=TA_CENTER, textColor=colors.grey)
    ))
    
    # Construir PDF
    doc.build(story)
    print(f"\n✅ PDF MEJORADO creado exitosamente!")
    print(f"📄 Total: ~26 páginas")
    print(f"📁 Ubicación: {os.path.abspath(filename)}")
    print(f"\n🎨 Mejoras incluidas:")
    print(f"   • Narrativa personal y motivadora")
    print(f"   • Intros entusiastas en cada gasto")
    print(f"   • Gráfica de ahorro potencial")
    print(f"   • Caso práctico REAL de Antonio (pintor)")
    print(f"   • Tabla comparativa con números")
    print(f"   • Tips PRO en cada sección")
    print(f"   • Mensaje final inspirador")

if __name__ == "__main__":
    create_pdf()

