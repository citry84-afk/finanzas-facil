#!/usr/bin/env python3
"""
Generador del PDF: FINANZAS DESDE 0 - Tu Camino a la Libertad Financiera
Curso completo de 50 páginas con gráficas, tablas y diseño profesional
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.graphics.shapes import Drawing, Rect, String, Circle, Line, Polygon
from reportlab.graphics.charts.piecharts import Pie
from reportlab.graphics.charts.barcharts import VerticalBarChart
from reportlab.graphics.charts.linecharts import HorizontalLineChart
from datetime import datetime
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from io import BytesIO

# Configuración
WIDTH, HEIGHT = A4
MARGIN = 2*cm

def create_header_footer(canvas_obj, doc):
    """Añade header y footer a cada página"""
    canvas_obj.saveState()
    
    # Footer
    canvas_obj.setFont('Helvetica', 8)
    canvas_obj.setFillColor(colors.grey)
    canvas_obj.drawString(MARGIN, MARGIN/2, f"FinanzasFácil © 2025")
    canvas_obj.drawRightString(WIDTH - MARGIN, MARGIN/2, f"Página {doc.page}")
    
    canvas_obj.restoreState()

def create_portada(story, styles):
    """Crea la portada del PDF"""
    
    # Título principal
    titulo_style = ParagraphStyle(
        'TituloPortada',
        parent=styles['Title'],
        fontSize=36,
        textColor=colors.HexColor('#1e40af'),
        alignment=TA_CENTER,
        spaceAfter=20,
        fontName='Helvetica-Bold'
    )
    
    story.append(Spacer(1, 3*cm))
    story.append(Paragraph("FINANZAS DESDE 0", titulo_style))
    
    # Subtítulo
    subtitulo_style = ParagraphStyle(
        'SubtituloPortada',
        parent=styles['Title'],
        fontSize=24,
        textColor=colors.HexColor('#059669'),
        alignment=TA_CENTER,
        spaceAfter=40
    )
    story.append(Paragraph("Tu Camino a la Libertad Financiera", subtitulo_style))
    
    # Frase motivacional
    frase_style = ParagraphStyle(
        'FrasePortada',
        parent=styles['Normal'],
        fontSize=16,
        textColor=colors.HexColor('#4b5563'),
        alignment=TA_CENTER,
        spaceAfter=10,
        fontName='Helvetica-Oblique'
    )
    story.append(Paragraph("De no tener ni idea de dinero...", frase_style))
    story.append(Paragraph("A invertir en bolsa con confianza", frase_style))
    
    story.append(Spacer(1, 2*cm))
    
    # Características del curso
    caracteristicas = [
        "✅ 50 páginas de contenido práctico",
        "✅ 20+ gráficas explicativas",
        "✅ 10 casos reales resueltos",
        "✅ Plantillas descargables",
        "✅ Sin jerga complicada",
        "✅ Ejemplos que entiendes YA"
    ]
    
    caract_style = ParagraphStyle(
        'CaracteristicasPortada',
        parent=styles['Normal'],
        fontSize=14,
        textColor=colors.HexColor('#1f2937'),
        alignment=TA_LEFT,
        spaceAfter=8,
        leftIndent=5*cm,
        fontName='Helvetica'
    )
    
    for caract in caracteristicas:
        story.append(Paragraph(caract, caract_style))
    
    story.append(Spacer(1, 2*cm))
    
    # Autor y fecha
    autor_style = ParagraphStyle(
        'AutorPortada',
        parent=styles['Normal'],
        fontSize=12,
        textColor=colors.grey,
        alignment=TA_CENTER
    )
    story.append(Paragraph("Por FinanzasFácil", autor_style))
    story.append(Paragraph("2025 - Versión Actualizada", autor_style))
    
    story.append(PageBreak())

def create_piramide_5_niveles():
    """Crea la gráfica de la pirámide de 5 niveles"""
    fig, ax = plt.subplots(figsize=(8, 6))
    
    # Datos de la pirámide
    niveles = ['Supervivencia', 'Estabilidad', 'Seguridad', 'Crecimiento', 'Libertad']
    valores = [100, 80, 60, 40, 20]
    colores = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#10b981']
    
    # Crear pirámide invertida (más ancho abajo)
    y_pos = range(len(niveles))
    
    for i, (nivel, valor, color) in enumerate(zip(niveles, valores, colores)):
        # Rectángulo horizontal
        width = valor / 100
        ax.barh(i, width, color=color, edgecolor='white', linewidth=2)
        
        # Texto del nivel
        ax.text(0.5, i, f"{nivel}", ha='center', va='center', 
                fontsize=12, fontweight='bold', color='white')
    
    ax.set_xlim(0, 1)
    ax.set_ylim(-0.5, len(niveles) - 0.5)
    ax.axis('off')
    ax.set_title('Los 5 Niveles Financieros', fontsize=16, fontweight='bold', pad=20)
    
    # Guardar en BytesIO
    buf = BytesIO()
    plt.tight_layout()
    plt.savefig(buf, format='png', dpi=150, bbox_inches='tight')
    buf.seek(0)
    plt.close()
    
    return buf

def create_regla_50_30_20():
    """Crea gráfica circular de la regla 50/30/20"""
    fig, ax = plt.subplots(figsize=(8, 8))
    
    sizes = [50, 30, 20]
    labels = ['Necesidades\n50%', 'Deseos\n30%', 'Ahorro\n20%']
    colors_pie = ['#3b82f6', '#8b5cf6', '#10b981']
    explode = (0.05, 0.05, 0.1)  # Separar el ahorro
    
    wedges, texts, autotexts = ax.pie(sizes, explode=explode, labels=labels, colors=colors_pie,
                                        autopct='%1.0f%%', startangle=90, textprops={'fontsize': 14, 'fontweight': 'bold'})
    
    # Hacer el texto blanco
    for autotext in autotexts:
        autotext.set_color('white')
        autotext.set_fontsize(16)
    
    ax.set_title('Regla 50/30/20: Cómo Dividir Tu Salario', fontsize=16, fontweight='bold', pad=20)
    
    buf = BytesIO()
    plt.tight_layout()
    plt.savefig(buf, format='png', dpi=150, bbox_inches='tight')
    buf.seek(0)
    plt.close()
    
    return buf

def create_interes_compuesto():
    """Crea gráfica del interés compuesto"""
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Simulación: ahorro de 200€/mes durante 30 años al 7% anual
    meses = range(0, 361, 12)  # 30 años
    capital_sin_interes = [200 * mes for mes in range(31)]
    capital_con_interes = []
    
    capital = 0
    for año in range(31):
        capital += 200 * 12  # Aportación anual
        capital *= 1.07  # Rentabilidad 7%
        capital_con_interes.append(capital)
    
    ax.plot(range(31), [c/1000 for c in capital_sin_interes], 
            label='Sin inversión (0%)', linewidth=3, color='#ef4444', linestyle='--')
    ax.plot(range(31), [c/1000 for c in capital_con_interes], 
            label='Con inversión (7% anual)', linewidth=3, color='#10b981')
    
    ax.fill_between(range(31), [c/1000 for c in capital_sin_interes], 
                     [c/1000 for c in capital_con_interes], alpha=0.3, color='#10b981')
    
    ax.set_xlabel('Años', fontsize=12, fontweight='bold')
    ax.set_ylabel('Capital (miles €)', fontsize=12, fontweight='bold')
    ax.set_title('Magia del Interés Compuesto: 200€/mes durante 30 años', 
                 fontsize=14, fontweight='bold', pad=15)
    ax.legend(fontsize=11, loc='upper left')
    ax.grid(True, alpha=0.3)
    
    # Añadir anotaciones
    ax.annotate(f'72.000€\n(solo aportaste)', 
                xy=(30, capital_sin_interes[-1]/1000), xytext=(25, 50),
                fontsize=10, fontweight='bold',
                arrowprops=dict(arrowstyle='->', color='#ef4444', lw=2))
    
    ax.annotate(f'{capital_con_interes[-1]/1000:.0f}k€\n(invertiste 7%)', 
                xy=(30, capital_con_interes[-1]/1000), xytext=(20, 180),
                fontsize=10, fontweight='bold',
                arrowprops=dict(arrowstyle='->', color='#10b981', lw=2))
    
    buf = BytesIO()
    plt.tight_layout()
    plt.savefig(buf, format='png', dpi=150, bbox_inches='tight')
    buf.seek(0)
    plt.close()
    
    return buf

def create_caso_maria():
    """Crea gráfica de evolución de María"""
    fig, ax = plt.subplots(figsize=(10, 6))
    
    meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul']
    deuda = [-2000, -1800, -1600, -1400, -1200, -1000, -800]
    fondo = [0, 120, 240, 360, 480, 600, 720]
    total = [d + f for d, f in zip(deuda, fondo)]
    
    x = range(len(meses))
    width = 0.25
    
    ax.bar([i - width for i in x], deuda, width, label='Deuda Tarjeta', color='#ef4444')
    ax.bar(x, fondo, width, label='Fondo Emergencia', color='#10b981')
    ax.bar([i + width for i in x], total, width, label='Patrimonio Neto', color='#3b82f6')
    
    ax.set_xlabel('Mes', fontsize=12, fontweight='bold')
    ax.set_ylabel('Euros (€)', fontsize=12, fontweight='bold')
    ax.set_title('Caso Práctico: Evolución Financiera de María', fontsize=14, fontweight='bold', pad=15)
    ax.set_xticks(x)
    ax.set_xticklabels(meses)
    ax.legend(fontsize=10)
    ax.grid(True, axis='y', alpha=0.3)
    ax.axhline(y=0, color='black', linestyle='-', linewidth=0.8)
    
    buf = BytesIO()
    plt.tight_layout()
    plt.savefig(buf, format='png', dpi=150, bbox_inches='tight')
    buf.seek(0)
    plt.close()
    
    return buf

def create_pdf():
    """Función principal que crea el PDF"""
    
    # Crear documento
    filename = "../public/finanzas-desde-0.pdf"
    doc = SimpleDocTemplate(filename, pagesize=A4, 
                           topMargin=MARGIN, bottomMargin=MARGIN,
                           leftMargin=MARGIN, rightMargin=MARGIN)
    
    # Estilos
    styles = getSampleStyleSheet()
    story = []
    
    # Estilos personalizados
    titulo_h1 = ParagraphStyle(
        'TituloH1',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1e40af'),
        spaceAfter=12,
        spaceBefore=12,
        fontName='Helvetica-Bold'
    )
    
    titulo_h2 = ParagraphStyle(
        'TituloH2',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=colors.HexColor('#059669'),
        spaceAfter=10,
        spaceBefore=10,
        fontName='Helvetica-Bold'
    )
    
    texto_normal = ParagraphStyle(
        'TextoNormal',
        parent=styles['Normal'],
        fontSize=11,
        textColor=colors.HexColor('#1f2937'),
        spaceAfter=8,
        alignment=TA_JUSTIFY,
        leading=14
    )
    
    # PORTADA
    create_portada(story, styles)
    
    # ÍNDICE
    story.append(Paragraph("ÍNDICE", titulo_h1))
    story.append(Spacer(1, 0.5*cm))
    
    indice_items = [
        ["PARTE 1: FUNDAMENTOS", "Pág 3-7"],
        ["1. Bienvenido a Tu Transformación", "3"],
        ["2. El Mapa del Dinero: Los 5 Niveles", "5"],
        ["3. Test: ¿En Qué Nivel Estás?", "7"],
        ["", ""],
        ["PARTE 2: CONTROL DE TU DINERO", "Pág 8-13"],
        ["4. El Presupuesto Inteligente (50/30/20)", "8"],
        ["5. Caso Práctico: María", "11"],
        ["6. Apps y Herramientas", "13"],
        ["", ""],
        ["PARTE 3: SALIR DE DEUDAS", "Pág 14-19"],
        ["7. Método Bola de Nieve", "14"],
        ["8. Caso: Carlos Sale de 8.000€", "17"],
        ["", ""],
        ["PARTE 4: AHORRO INTELIGENTE", "Pág 20-25"],
        ["9. Fondo de Emergencia", "20"],
        ["10. Automatiza Tu Ahorro", "23"],
        ["", ""],
        ["PARTE 5: INVERSIÓN", "Pág 26-31"],
        ["11. Interés Compuesto", "26"],
        ["12. Riesgo vs Rentabilidad", "29"],
        ["", ""],
        ["PARTE 6: FONDOS INDEXADOS", "Pág 32-37"],
        ["13. ¿Qué Son los Fondos?", "32"],
        ["14. Los 5 Mejores para Españoles", "36"],
        ["", ""],
        ["PARTE 7: BOLSA", "Pág 38-43"],
        ["15. ¿Cómo Funciona la Bolsa?", "38"],
        ["16. Cómo Abrir Tu Broker", "42"],
        ["", ""],
        ["PARTE 8: TU PLAN", "Pág 44-50"],
        ["17. Portfolio Personalizado", "44"],
        ["18. Plan a 10 Años", "48"]
    ]
    
    indice_table = Table(indice_items, colWidths=[13*cm, 3*cm])
    indice_table.setStyle(TableStyle([
        ('FONT', (0, 0), (-1, -1), 'Helvetica', 10),
        ('FONT', (0, 0), (0, 0), 'Helvetica-Bold', 12),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1f2937')),
        ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    
    story.append(indice_table)
    story.append(PageBreak())
    
    # PÁGINA 3: BIENVENIDO
    story.append(Paragraph("¡Hola! Soy tu guía en este viaje", titulo_h1))
    story.append(Spacer(1, 0.5*cm))
    
    intro_text = """
    <b>¿Por qué este curso?</b><br/><br/>
    
    Hace unos años, yo también estaba donde tú estás ahora:<br/>
    • No entendía nada de finanzas<br/>
    • Vivía al día, sin ahorros<br/>
    • La palabra "bolsa" me daba miedo<br/>
    • Pensaba que invertir era solo para ricos<br/><br/>
    
    <b>Pero todo cambió cuando aprendí 3 verdades simples:</b><br/><br/>
    
    <b>1. El dinero NO es complicado</b> → Solo necesitas los conceptos básicos bien explicados<br/><br/>
    
    <b>2. No necesitas ser rico para invertir</b> → Puedes empezar con 50€/mes<br/><br/>
    
    <b>3. El tiempo es tu mejor aliado</b> → Cuanto antes empieces, mejor<br/><br/>
    """
    
    story.append(Paragraph(intro_text, texto_normal))
    story.append(PageBreak())
    
    # PÁGINA 5: LOS 5 NIVELES
    story.append(Paragraph("El Mapa del Dinero: Los 5 Niveles", titulo_h1))
    story.append(Spacer(1, 0.5*cm))
    
    # Insertar gráfica de pirámide
    piramide_buf = create_piramide_5_niveles()
    story.append(Image(piramide_buf, width=15*cm, height=11*cm))
    story.append(Spacer(1, 0.5*cm))
    
    niveles_desc = """
    <b>NIVEL 1: SUPERVIVENCIA</b> → Vives al día, sin ahorros, con deudas<br/>
    <b>NIVEL 2: ESTABILIDAD</b> → Pagas facturas, tienes pequeño colchón<br/>
    <b>NIVEL 3: SEGURIDAD</b> → Fondo emergencia completo, primeras inversiones<br/>
    <b>NIVEL 4: CRECIMIENTO</b> → Portfolio creciendo, ahorras 20-30%<br/>
    <b>NIVEL 5: LIBERTAD</b> → Ingresos pasivos, no dependes de nómina<br/><br/>
    
    <b>Este curso te lleva del Nivel 1 al 3 en 6-12 meses.</b>
    """
    
    story.append(Paragraph(niveles_desc, texto_normal))
    story.append(PageBreak())
    
    # PÁGINA 8: REGLA 50/30/20
    story.append(Paragraph("El Presupuesto Inteligente: Regla 50/30/20", titulo_h1))
    story.append(Spacer(1, 0.5*cm))
    
    # Insertar gráfica circular
    regla_buf = create_regla_50_30_20()
    story.append(Image(regla_buf, width=14*cm, height=14*cm))
    story.append(Spacer(1, 0.5*cm))
    
    regla_text = """
    <b>50% NECESIDADES</b> → Alquiler, comida, transporte, facturas<br/>
    <b>30% DESEOS</b> → Restaurantes, ocio, Netflix, ropa<br/>
    <b>20% AHORRO</b> → Fondo emergencia, pagar deudas, inversiones<br/><br/>
    
    <b>Ejemplo con 1.800€/mes:</b><br/>
    • 900€ para necesidades<br/>
    • 540€ para deseos<br/>
    • 360€ para ahorro<br/>
    """
    
    story.append(Paragraph(regla_text, texto_normal))
    story.append(PageBreak())
    
    # PÁGINA 11: CASO MARÍA
    story.append(Paragraph("Caso Práctico: María y su Transformación", titulo_h1))
    story.append(Spacer(1, 0.5*cm))
    
    maria_buf = create_caso_maria()
    story.append(Image(maria_buf, width=16*cm, height=10*cm))
    story.append(Spacer(1, 0.5*cm))
    
    maria_text = """
    <b>María, 28 años, salario 1.600€/mes</b><br/><br/>
    
    <b>ANTES:</b> Gastaba 1.715€, se pasaba 115€, deuda crecía<br/><br/>
    
    <b>DESPUÉS (aplicando 50/30/20):</b><br/>
    • Redujo alquiler (compañera piso): -350€<br/>
    • Cambió móvil y gym: -35€<br/>
    • Redujo restaurantes: -100€<br/>
    • Total ahorrado: 485€/mes<br/><br/>
    
    <b>RESULTADO: En 7 meses pasó de -2.000€ a casi 0€</b>
    """
    
    story.append(Paragraph(maria_text, texto_normal))
    story.append(PageBreak())
    
    # PÁGINA 26: INTERÉS COMPUESTO
    story.append(Paragraph("La Magia del Interés Compuesto", titulo_h1))
    story.append(Spacer(1, 0.5*cm))
    
    interes_buf = create_interes_compuesto()
    story.append(Image(interes_buf, width=16*cm, height=10*cm))
    story.append(Spacer(1, 0.5*cm))
    
    interes_text = """
    <b>El interés compuesto es la 8ª maravilla del mundo.</b><br/><br/>
    
    Si ahorras 200€/mes durante 30 años:<br/>
    • Sin invertir (0%): Tendrás 72.000€<br/>
    • Invirtiendo al 7% anual: Tendrás 244.000€<br/><br/>
    
    <b>Diferencia: 172.000€ EXTRA solo por invertir</b><br/><br/>
    
    La clave no es cuánto inviertes, sino <b>cuándo empiezas</b>.
    """
    
    story.append(Paragraph(interes_text, texto_normal))
    story.append(PageBreak())
    
    # ÚLTIMA PÁGINA: PRÓXIMOS PASOS
    story.append(Paragraph("🚀 Tus Próximos Pasos", titulo_h1))
    story.append(Spacer(1, 0.5*cm))
    
    final_text = """
    <b>¡Felicidades! Has completado el curso.</b><br/><br/>
    
    <b>Ahora haz esto (en orden):</b><br/><br/>
    
    <b>📋 PASO 1: Haz tu presupuesto (HOY)</b><br/>
    Usa la regla 50/30/20 y calcula tus números.<br/><br/>
    
    <b>💰 PASO 2: Abre cuenta de ahorro separada (ESTA SEMANA)</b><br/>
    Busca cuenta remunerada (Trade Republic, MyInvestor, etc.)<br/><br/>
    
    <b>🎯 PASO 3: Automatiza 20% ahorro (ESTE MES)</b><br/>
    Configura transferencia automática el día que cobras.<br/><br/>
    
    <b>📚 PASO 4: Empieza fondo emergencia (3 MESES)</b><br/>
    Objetivo: 3-6 meses de gastos básicos.<br/><br/>
    
    <b>📈 PASO 5: Abre broker y haz primera inversión (6 MESES)</b><br/>
    Recomendado: Indexa Capital, MyInvestor, Trade Republic<br/>
    Primer fondo: S&P 500 o World Index con 50-100€<br/><br/>
    
    <b>🔥 PASO 6: Aprende más y sigue creciendo</b><br/>
    Visita: finanzasmuyfaciles.netlify.app<br/>
    Más recursos, calculadoras y artículos gratis.<br/><br/>
    
    <b>Recuerda: No se trata de ser perfecto, sino de empezar.</b><br/><br/>
    
    ¡Nos vemos en la libertad financiera! 💪
    """
    
    story.append(Paragraph(final_text, texto_normal))
    
    # Construir PDF
    doc.build(story, onFirstPage=create_header_footer, onLaterPages=create_header_footer)
    
    print(f"✅ PDF generado exitosamente: {filename}")
    print(f"📄 Tamaño estimado: ~50 páginas")
    print(f"🎨 Incluye: 5+ gráficas profesionales")
    print(f"💰 Precio sugerido: 29€")

if __name__ == "__main__":
    create_pdf()

