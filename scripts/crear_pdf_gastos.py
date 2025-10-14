#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas
import os

def create_pdf():
    # Configuración del documento
    filename = "../public/20-gastos-deducibles-autonomos-2025.pdf"
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )
    
    # Estilos
    styles = getSampleStyleSheet()
    
    # Estilo personalizado para título
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=28,
        textColor=colors.HexColor('#1E40AF'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    # Estilo para subtítulo
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=colors.HexColor('#059669'),
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    # Estilo para encabezados de sección
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.HexColor('#1E40AF'),
        spaceAfter=12,
        spaceBefore=12,
        fontName='Helvetica-Bold'
    )
    
    # Estilo para texto normal
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=12,
        alignment=TA_JUSTIFY,
        leading=16
    )
    
    # Estilo para bullets
    bullet_style = ParagraphStyle(
        'CustomBullet',
        parent=styles['Normal'],
        fontSize=11,
        leftIndent=20,
        spaceAfter=8,
        leading=14
    )
    
    # Contenido del PDF
    story = []
    
    # PÁGINA 1: PORTADA
    story.append(Spacer(1, 3*cm))
    story.append(Paragraph("20 GASTOS DEDUCIBLES", title_style))
    story.append(Paragraph("PARA AUTÓNOMOS 2025", title_style))
    story.append(Spacer(1, 1*cm))
    story.append(Paragraph("Ahorra entre 2.000€ y 5.000€ al año", subtitle_style))
    story.append(Paragraph("(100% Legal y Actualizado)", subtitle_style))
    story.append(Spacer(1, 4*cm))
    story.append(Paragraph("finanzasmuyfaciles.netlify.app", normal_style))
    story.append(PageBreak())
    
    # PÁGINA 2: INTRODUCCIÓN
    story.append(Paragraph("¿Por qué necesitas esta guía?", heading_style))
    story.append(Paragraph(
        "El 87% de los autónomos en España <b>NO deducen todos los gastos</b> que tienen derecho.",
        normal_style
    ))
    story.append(Paragraph(
        "Resultado: <b>Pagan entre 2.000€ y 5.000€ de MÁS cada año.</b>",
        normal_style
    ))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("Esta guía te muestra los 20 gastos más importantes que puedes deducir legalmente para:", normal_style))
    story.append(Paragraph("✅ Reducir tu base imponible de IRPF", bullet_style))
    story.append(Paragraph("✅ Recuperar IVA soportado", bullet_style))
    story.append(Paragraph("✅ Ahorrar miles de euros cada año", bullet_style))
    story.append(Paragraph("✅ Cumplir con Hacienda sin problemas", bullet_style))
    story.append(Spacer(1, 1*cm))
    
    story.append(Paragraph("Cómo usar esta guía:", heading_style))
    story.append(Paragraph("1. Lee cada gasto deducible", bullet_style))
    story.append(Paragraph("2. Marca los que aplican a tu caso", bullet_style))
    story.append(Paragraph("3. Reúne las facturas necesarias", bullet_style))
    story.append(Paragraph("4. Entrégaselas a tu gestor (o inclúyelas tú mismo)", bullet_style))
    story.append(Paragraph("5. Ahorra miles de euros 💰", bullet_style))
    story.append(PageBreak())
    
    # GASTOS DEDUCIBLES (simplificado para brevedad)
    gastos = [
        {
            "numero": "1",
            "titulo": "GASTOS DE OFICINA EN CASA",
            "emoji": "🏠",
            "que": "Si trabajas desde casa, puedes deducir un porcentaje de: Luz, Agua, Gas/Calefacción, Internet, Teléfono, Alquiler o hipoteca, IBI, Comunidad, Seguro de hogar",
            "cuanto": "% deducible = (m² de oficina / m² totales) × 100\n\nEjemplo: Casa 100m², Oficina 15m² = 15% deducible\nSi gastas 1.500€/año → Deduces 225€",
            "ahorro": "IRPF: 225€ × 30% = 67,50€\nIVA: Recuperas el 21%\nTotal ahorro: ~90€/año",
            "requisitos": "1. Oficina claramente delimitada\n2. Uso exclusivo o habitual\n3. Facturas a tu nombre\n4. Conservar facturas 4 años"
        },
        {
            "numero": "2",
            "titulo": "VEHÍCULO PROFESIONAL",
            "emoji": "🚗",
            "que": "Si usas tu coche para trabajo: Gasolina, Seguro, Reparaciones, ITV, Parking profesional, Peajes",
            "cuanto": "Máximo 50% de los gastos\n\nEjemplo:\nGasolina: 2.000€ → 1.000€\nSeguro: 600€ → 300€\nReparaciones: 400€ → 200€\nTotal deducible: 1.500€",
            "ahorro": "IRPF: 1.500€ × 30% = 450€\nIVA: Recuperas 315€\nTotal ahorro: ~765€/año",
            "requisitos": "1. Uso para actividad profesional\n2. Registro de kilómetros\n3. Facturas a tu nombre"
        },
        {
            "numero": "3",
            "titulo": "EQUIPOS INFORMÁTICOS",
            "emoji": "💻",
            "que": "Ordenadores, Tablets, Móviles, Monitores, Software, Impresoras",
            "cuanto": "100% si es uso exclusivo\n50% si es uso mixto\n\nEquipos < 300€ → Gasto directo\nEquipos > 300€ → Amortización (4 años)",
            "ahorro": "Ejemplo: 450€ en equipos\nIRPF: 450€ × 30% = 135€\nIVA: Recuperas 94,50€\nTotal: ~230€/año",
            "requisitos": "1. Factura a tu nombre\n2. Uso vinculado al trabajo\n3. Conservar 4 años"
        },
        {
            "numero": "4",
            "titulo": "MOBILIARIO DE OFICINA",
            "emoji": "🪑",
            "que": "Mesa, Silla ergonómica, Estanterías, Archivadores, Lámpara",
            "cuanto": "100% deducible\n\nMuebles < 300€ → Gasto directo\nMuebles > 300€ → Amortización 10 años",
            "ahorro": "Ejemplo: Silla 350€ + Mesa 200€\nDeducible: 235€/año\nAhorro: ~120€/año",
            "requisitos": "1. Uso profesional\n2. Factura a tu nombre\n3. Ubicado en tu espacio de trabajo"
        },
        {
            "numero": "5",
            "titulo": "FORMACIÓN Y CURSOS",
            "emoji": "📚",
            "que": "Cursos online, Másters, Certificaciones, Conferencias, Libros técnicos, Suscripciones profesionales",
            "cuanto": "100% si relacionado con actividad\n\nEjemplo:\nCurso: 297€\nLibros: 80€\nCertificación: 150€\nTotal: 527€",
            "ahorro": "IRPF: 527€ × 30% = 158€\nIVA: Recuperas 111€\nTotal: ~269€/año",
            "requisitos": "1. Vinculado a tu actividad\n2. Factura o justificante\n3. Certificado (recomendable)"
        },
        {
            "numero": "6",
            "titulo": "SEGUROS PROFESIONALES",
            "emoji": "🛡️",
            "que": "Responsabilidad civil, Seguro de salud (máx 500€), Cese de actividad, Accidentes, Equipos",
            "cuanto": "100% seguros profesionales\n500€/año máximo seguro salud\n\nEjemplo:\nR. Civil: 200€\nSalud: 800€ → 500€\nEquipos: 120€\nTotal: 820€",
            "ahorro": "IRPF: 820€ × 30% = 246€\nTotal: ~246€/año",
            "requisitos": "1. Póliza a tu nombre\n2. Relacionado con actividad\n3. Justificante de pago"
        },
        {
            "numero": "7",
            "titulo": "MATERIAL DE OFICINA",
            "emoji": "📎",
            "que": "Papel, Tinta, Bolígrafos, Carpetas, Sobres, Tarjetas de visita",
            "cuanto": "100% deducible\n\nEjemplo anual:\nTinta: 150€\nPapel: 50€\nMaterial: 100€\nTarjetas: 80€\nTotal: 380€",
            "ahorro": "IRPF: 380€ × 30% = 114€\nIVA: 80€\nTotal: ~194€/año",
            "requisitos": "1. Facturas a tu nombre\n2. Uso profesional\n3. Razonabilidad"
        },
        {
            "numero": "8",
            "titulo": "SERVICIOS PROFESIONALES",
            "emoji": "👨‍💼",
            "que": "Gestoría, Abogados, Diseñadores, Desarrolladores web, Consultores, Freelancers",
            "cuanto": "100% deducible\n\nEjemplo:\nGestoría: 600€/año\nDiseño: 300€\nWeb: 240€\nTotal: 1.140€",
            "ahorro": "IRPF: 1.140€ × 30% = 342€\nIVA: 239€\nTotal: ~581€/año",
            "requisitos": "1. Factura con IVA\n2. Vinculado a actividad\n3. Pago justificado"
        },
        {
            "numero": "9",
            "titulo": "MARKETING Y PUBLICIDAD",
            "emoji": "📣",
            "que": "Facebook Ads, Google Ads, Flyers, Anuncios, Regalos promocionales (<300€), Email marketing, SEO",
            "cuanto": "100% deducible\n\nEjemplo:\nFacebook Ads: 600€\nGoogle Ads: 400€\nPromo: 150€\nTotal: 1.150€",
            "ahorro": "IRPF: 1.150€ × 30% = 345€\nIVA: 242€\nTotal: ~587€/año",
            "requisitos": "1. Finalidad publicitaria\n2. Facturas\n3. Regalos < 300€/persona"
        },
        {
            "numero": "10",
            "titulo": "GASTOS FINANCIEROS",
            "emoji": "🏦",
            "que": "Comisiones bancarias, Mantenimiento cuenta, TPV, PayPal, Stripe, Intereses préstamos",
            "cuanto": "100% si cuenta profesional\n\nEjemplo:\nMantenimiento: 120€\nTPV: 200€\nPayPal: 180€\nTotal: 500€",
            "ahorro": "IRPF: 500€ × 30% = 150€\nTotal: ~150€/año",
            "requisitos": "1. Cuenta profesional\n2. Extractos bancarios\n3. Vinculado a actividad"
        },
        {
            "numero": "11",
            "titulo": "DIETAS Y MANUTENCIÓN",
            "emoji": "🍽️",
            "que": "Comidas con clientes, Comidas en viajes profesionales, Catering eventos",
            "cuanto": "Límites diarios:\n26,67€ sin pernocta\n53,34€ con pernocta\n\nIVA: Solo 50% deducible",
            "ahorro": "Ejemplo: 10 comidas × 25€\nIRPF: 250€ × 30% = 75€\nIVA: 26€\nTotal: ~101€/año",
            "requisitos": "1. Factura detallada\n2. Pago con tarjeta\n3. Justificación del viaje\n4. Fuera de tu municipio"
        },
        {
            "numero": "12",
            "titulo": "VIAJES Y DESPLAZAMIENTOS",
            "emoji": "✈️",
            "que": "Avión, Tren, Hoteles, Taxi, Alquiler coches, Parking",
            "cuanto": "100% deducible\n\nKilometraje: 0,19€/km\n\nEjemplo viaje:\nTren: 120€\nHotel: 180€\nTaxi: 40€\nTotal: 340€",
            "ahorro": "IRPF: 340€ × 30% = 102€\nIVA: 71€\nTotal: ~173€/viaje",
            "requisitos": "1. Factura a tu nombre\n2. Justificación motivo\n3. Fechas coherentes"
        },
        {
            "numero": "13",
            "titulo": "ALQUILER LOCAL U OFICINA",
            "emoji": "🏢",
            "que": "Alquiler, Comunidad, IBI, Basuras, Suministros del local, Internet, Seguro",
            "cuanto": "100% uso exclusivo\n\nEjemplo:\nAlquiler: 4.800€/año\nComunidad: 600€\nSuministros: 800€\nTotal: 6.200€",
            "ahorro": "IRPF: 6.200€ × 30% = 1.860€\nIVA: 1.302€\nTotal: ~3.162€/año",
            "requisitos": "1. Contrato a tu nombre\n2. Facturas suministros\n3. Justificantes pago"
        },
        {
            "numero": "14",
            "titulo": "CUOTA DE AUTÓNOMOS",
            "emoji": "💳",
            "que": "Cuota mensual Seguridad Social, Mutua",
            "cuanto": "100% deducible\n\nEjemplo cuota media:\n280€/mes = 3.360€/año",
            "ahorro": "IRPF: 3.360€ × 30% = 1.008€\nTotal: ~1.008€/año",
            "requisitos": "Ninguno. Deducible automáticamente.\n\n⚠️ NO olvides incluirla"
        },
        {
            "numero": "15",
            "titulo": "SUMINISTROS (Luz, Agua, Internet)",
            "emoji": "💡",
            "que": "Electricidad, Agua, Gas, Internet, Teléfono, Alarma",
            "cuanto": "Local: 100%\nCasa: % según m² oficina\n\nEjemplo local:\nLuz: 1.200€\nAgua: 360€\nInternet: 600€\nTotal: 2.160€",
            "ahorro": "IRPF: 2.160€ × 30% = 648€\nIVA: 454€\nTotal: ~1.102€/año",
            "requisitos": "1. Facturas a tu nombre\n2. Domicilio fiscal\n3. Justificación %"
        },
        {
            "numero": "16",
            "titulo": "SOFTWARE Y APLICACIONES",
            "emoji": "💻",
            "que": "Dominio, Hosting, Contabilidad, Office 365, Adobe, Canva Pro, Zoom, Antivirus, Cloud",
            "cuanto": "100% deducible\n\nEjemplo:\nDominio: 15€\nHosting: 100€\nSoftware: 300€\nGoogle: 72€\nTotal: 487€",
            "ahorro": "IRPF: 487€ × 30% = 146€\nIVA: 102€\nTotal: ~248€/año",
            "requisitos": "1. Suscripción a tu nombre\n2. Uso profesional\n3. Justificante pago"
        },
        {
            "numero": "17",
            "titulo": "REPARACIONES",
            "emoji": "🔧",
            "que": "Reparación ordenadores, móviles, vehículo profesional, local",
            "cuanto": "100% si es material profesional\n\nEjemplo:\nPortátil: 150€\nMóvil: 80€\nCoche (50%): 100€\nTotal: 330€",
            "ahorro": "IRPF: 330€ × 30% = 99€\nIVA: 69€\nTotal: ~168€/año",
            "requisitos": "1. Factura detallada\n2. Bien profesional\n3. Razonabilidad"
        },
        {
            "numero": "18",
            "titulo": "ENVÍOS Y MENSAJERÍA",
            "emoji": "📦",
            "que": "Correos, Mensajería, Paquetería, Transporte, Material embalaje",
            "cuanto": "100% deducible\n\nE-commerce:\n50 envíos/mes × 5€ = 250€/mes\nTotal: 3.000€/año",
            "ahorro": "IRPF: 3.000€ × 30% = 900€\nIVA: 630€\nTotal: ~1.530€/año",
            "requisitos": "1. Factura/justificante\n2. Relacionado con actividad\n3. Conservar albaranes"
        },
        {
            "numero": "19",
            "titulo": "REGALOS A CLIENTES",
            "emoji": "🎁",
            "que": "Cestas Navidad, Detalles, Merchandising con logo, Muestras gratuitas",
            "cuanto": "Límite: 300€/persona/año\n\nIRPF: 100% deducible\nIVA: NO deducible\n\nEjemplo:\n20 clientes × 50€ = 1.000€",
            "ahorro": "IRPF: 1.000€ × 30% = 300€\nTotal: ~300€/año",
            "requisitos": "1. Valor < 300€/persona\n2. Factura con desglose\n3. Registro de entrega\n4. Carácter promocional"
        },
        {
            "numero": "20",
            "titulo": "GASTOS DE CONSTITUCIÓN",
            "emoji": "📋",
            "que": "Tasas alta, Notaría, Registro Mercantil, Licencias, Gestoría inicio, Logo y marca",
            "cuanto": "100% en el año que los pagaste\n\nAutónomo:\nGestoría: 150€\nLicencia: 200€\nBranding: 300€\nTotal: 650€",
            "ahorro": "IRPF: 650€ × 30% = 195€\nIVA: 137€\nTotal: ~332€",
            "requisitos": "1. Facturas originales\n2. Vinculado al inicio\n3. Dentro del primer año"
        }
    ]
    
    # Crear páginas para cada gasto
    for gasto in gastos:
        story.append(Paragraph(f"GASTO #{gasto['numero']} - {gasto['titulo']} {gasto['emoji']}", heading_style))
        
        story.append(Paragraph("¿Qué puedes deducir?", ParagraphStyle('SubHead', parent=heading_style, fontSize=12, textColor=colors.HexColor('#059669'))))
        story.append(Paragraph(gasto['que'], normal_style))
        story.append(Spacer(1, 0.3*cm))
        
        story.append(Paragraph("¿Cuánto puedes deducir?", ParagraphStyle('SubHead', parent=heading_style, fontSize=12, textColor=colors.HexColor('#059669'))))
        for linea in gasto['cuanto'].split('\n'):
            story.append(Paragraph(linea, normal_style))
        story.append(Spacer(1, 0.3*cm))
        
        story.append(Paragraph("💰 Ahorro fiscal:", ParagraphStyle('SubHead', parent=heading_style, fontSize=12, textColor=colors.HexColor('#059669'))))
        for linea in gasto['ahorro'].split('\n'):
            story.append(Paragraph(linea, normal_style))
        story.append(Spacer(1, 0.3*cm))
        
        story.append(Paragraph("✅ Requisitos:", ParagraphStyle('SubHead', parent=heading_style, fontSize=12, textColor=colors.HexColor('#059669'))))
        for linea in gasto['requisitos'].split('\n'):
            story.append(Paragraph(linea, bullet_style))
        
        story.append(PageBreak())
    
    # PÁGINA FINAL: CHECKLIST
    story.append(Paragraph("BONUS: CHECKLIST ANUAL", heading_style))
    story.append(Paragraph("¿Estás deduciendo todo?", subtitle_style))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("Marca los que SÍ estás deduciendo:", normal_style))
    story.append(Spacer(1, 0.3*cm))
    
    checklist_items = [
        "Gastos de casa (home office)",
        "Alquiler local/coworking",
        "Suministros (luz, agua, internet)",
        "Mobiliario de oficina",
        "Ordenadores y tablets",
        "Móviles y software",
        "Gasolina/diésel",
        "Seguro del coche",
        "Reparaciones vehículo",
        "Gestoría y asesoría",
        "Servicios profesionales",
        "Publicidad online (Ads)",
        "Regalos a clientes",
        "Cuota de autónomos",
        "Seguros profesionales",
        "Formación y cursos",
        "Material de oficina",
        "Viajes profesionales",
        "Dietas y manutención",
        "Envíos y mensajería"
    ]
    
    for item in checklist_items:
        story.append(Paragraph(f"☐ {item}", bullet_style))
    
    story.append(Spacer(1, 1*cm))
    story.append(Paragraph("🎯 OBJETIVO: Marca al menos 15 de 20", ParagraphStyle('Bold', parent=normal_style, fontSize=13, textColor=colors.HexColor('#DC2626'), fontName='Helvetica-Bold')))
    story.append(Paragraph("Si tienes menos de 10 marcados, estás perdiendo miles de euros al año.", normal_style))
    
    story.append(PageBreak())
    
    # ÚLTIMA PÁGINA: SIGUIENTE PASO
    story.append(Paragraph("🚀 SIGUIENTE PASO", heading_style))
    story.append(Paragraph("Empieza a ahorrar HOY MISMO", subtitle_style))
    story.append(Spacer(1, 0.5*cm))
    
    steps = [
        "PASO 1: Revisa tus gastos de los últimos 12 meses",
        "PASO 2: Identifica cuáles son deducibles (usa este PDF)",
        "PASO 3: Reúne todas las facturas",
        "PASO 4: Entrega a tu gestor O inclúyelos tú mismo",
        "PASO 5: Presenta tus declaraciones correctamente",
        "PASO 6: Ahorra miles de euros 💰"
    ]
    
    for step in steps:
        story.append(Paragraph(step, bullet_style))
    
    story.append(Spacer(1, 1*cm))
    story.append(Paragraph("🎁 RECURSOS ADICIONALES GRATIS:", heading_style))
    story.append(Paragraph("Visita nuestra web para:", normal_style))
    story.append(Paragraph("✅ Calculadora de IRPF (gratis)", bullet_style))
    story.append(Paragraph("✅ Calculadora de Autónomos (gratis)", bullet_style))
    story.append(Paragraph("✅ Blog con 50+ artículos sobre fiscalidad", bullet_style))
    story.append(Paragraph("✅ Plantillas descargables", bullet_style))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("<b>finanzasmuyfaciles.netlify.app</b>", ParagraphStyle('Center', parent=normal_style, alignment=TA_CENTER, fontSize=14, textColor=colors.HexColor('#1E40AF'))))
    
    story.append(Spacer(1, 1*cm))
    story.append(Paragraph("📧 Contacto: lipastudios4@gmail.com", ParagraphStyle('Center', parent=normal_style, alignment=TA_CENTER)))
    
    story.append(Spacer(1, 2*cm))
    story.append(Paragraph("© 2025 Finanzas Fácil - Todos los derechos reservados", ParagraphStyle('Footer', parent=normal_style, fontSize=9, alignment=TA_CENTER, textColor=colors.grey)))
    
    # Construir PDF
    doc.build(story)
    print(f"✅ PDF creado exitosamente: {filename}")
    print(f"📄 Total: {len(gastos) + 3} páginas")
    print(f"📁 Ubicación: {os.path.abspath(filename)}")

if __name__ == "__main__":
    create_pdf()

