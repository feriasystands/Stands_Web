import os
import re
import json

lang_selector_html = """            <div class="lang-selector" style="display:flex; gap:10px; margin-left:auto; align-items:center;">
                <a href="#" class="lang-btn active" data-lang="es" style="color:var(--white); text-decoration:none; font-weight:600;">ES</a>
                <span style="color:var(--gray)">|</span>
                <a href="#" class="lang-btn" data-lang="en" style="color:var(--gray); text-decoration:none;">EN</a>
            </div>"""

def add_lang_selector(content):
    if 'class="lang-selector"' not in content:
        content = re.sub(
            r'(<a href="index\.html" class="logo">FERIAS Y STANDS<span class="dot">\.</span></a>)',
            r'\1\n' + lang_selector_html,
            content
        )
    return content

def add_i18n_form(content):
    reps = {
        r'<h3 style=".*?">Diseñamos tu éxito</h3>': r'<h3 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 0.5rem;" data-i18n="lp-form-title">Diseñamos tu éxito</h3>',
        r'<p style="color: var(--gray);">Solicita tu propuesta en 3D y presupuesto sin compromiso.</p>': r'<p style="color: var(--gray);" data-i18n="lp-form-sub">Solicita tu propuesta en 3D y presupuesto sin compromiso.</p>',
        r'<label>Nombre y Empresa \*</label>': r'<label data-i18n="lp-form-name">Nombre y Empresa *</label>',
        r'<label>Email corporativo \*</label>': r'<label data-i18n="lp-form-email">Email corporativo *</label>',
        r'<label>¿En qué país/ciudad es la feria\? \*</label>': r'<label data-i18n="lp-form-loc">¿En qué país/ciudad es la feria? *</label>',
        r'<option value="">Selecciona ubicación</option>': r'<option value="" data-i18n="lp-form-loc-opt0">Selecciona ubicación</option>',
        r'<option value="Alemania">Alemania</option>': r'<option value="Alemania" data-i18n="lp-form-loc-opt1">Alemania</option>',
        r'<option value="Amsterdam">Ámsterdam \(Países Bajos\)</option>': r'<option value="Amsterdam" data-i18n="lp-form-loc-opt2">Ámsterdam (Países Bajos)</option>',
        r'<option value="Madrid">España - Madrid</option>': r'<option value="Madrid" data-i18n="lp-form-loc-opt3">España - Madrid</option>',
        r'<option value="Barcelona">España - Barcelona</option>': r'<option value="Barcelona" data-i18n="lp-form-loc-opt4">España - Barcelona</option>',
        r'<option value="Otro">Otro</option>': r'<option value="Otro" data-i18n="lp-form-loc-opt5">Otro</option>',
        r'<label>Nombre de la Feria</label>\s*<input type="text" name="nombre_feria" placeholder="Ej: Automechanika, ISE, FITUR">': r'<label data-i18n="lp-form-fair">Nombre de la Feria</label>\n                    <input type="text" name="nombre_feria" placeholder="Ej: Automechanika, ISE, FITUR" data-i18n-ph="lp-form-fair-ph">',
        r'<label>Metros cuadrados</label>\s*<input type="text" name="metros_cuadrados" placeholder="Ej: 30m2">': r'<label data-i18n="lp-form-sqm">Metros cuadrados</label>\n                    <input type="text" name="metros_cuadrados" placeholder="Ej: 30m2" data-i18n-ph="lp-form-sqm-ph">',
        r'<label>Fecha del Montaje \(Opcional\)</label>': r'<label data-i18n="lp-form-date">Fecha del Montaje (Opcional)</label>',
        r'<input type="text" name="fecha_reserva" id="waDate" placeholder="Elige un día\.\.\."': r'<input type="text" name="fecha_reserva" id="waDate" placeholder="Elige un día..." data-i18n-ph="lp-form-date-ph"',
        r'<label>Cuéntanos sobre tu Proyecto \*</label>': r'<label data-i18n="lp-form-msg">Cuéntanos sobre tu Proyecto *</label>',
        r'placeholder="Servicios que necesitas, requerimientos técnicos, etc\.\.\."': r'placeholder="Servicios que necesitas, requerimientos técnicos, etc..." data-i18n-ph="lp-form-msg-ph"',
        r'<button type="submit".*?>Solicitar Presupuesto Rápidamente</button>': r'<button type="submit" class="btn btn-primary full-width" style="margin-top: 1.5rem;" data-i18n="lp-form-btn">Solicitar Presupuesto Rápidamente</button>',
        r'<span style="vertical-align: middle;">¡Mensaje recibido! Nos pondremos\s*en contacto contigo pronto\.</span>': r'<span style="vertical-align: middle;" data-i18n="con-form-success">¡Mensaje recibido! Nos pondremos en contacto contigo pronto.</span>',
        r'<span style="color: var\(--gray\); font-size: 0\.9rem;">Acepto la <a\s*href="#" style="color: var\(--highlight\);">política de privacidad</a></span>': r'<span style="color: var(--gray); font-size: 0.9rem;" data-i18n="con-form-terms">Acepto la <a href="#" style="color: var(--highlight);">política de privacidad</a></span>'
    }
    for old, new in reps.items():
        content = re.sub(old, new, content)
    return content

# Page: ALEMANIA
with open('montaje-stands-ferias-alemania.html', 'r', encoding='utf-8') as f:
    c = f.read()
c = add_lang_selector(c)
c = add_i18n_form(c)
c = re.sub(r'<h1 class="hero-title">Diseño y Montaje de Stands en <br><span class="animated-text">Alemania</span></h1>', 
           r'<h1 class="hero-title"><span data-i18n="lp-ger-h1-first">Diseño y Montaje de Stands en</span> <br><span class="animated-text" id="animatedText" data-i18n="lp-ger-h1-second">Alemania</span></h1>', c)
c = re.sub(r'<p class="hero-subtitle">Llevamos tu marca a Messe Frankfurt, Hannover, Múnich y Düsseldorf. Servicio "Llave en Mano" sin barreras logísticas ni de idioma.</p>',
           r'<p class="hero-subtitle" data-i18n="lp-ger-sub">Llevamos tu marca a Messe Frankfurt, Hannover, Múnich y Düsseldorf. Servicio "Llave en Mano" sin barreras logísticas ni de idioma.</p>', c)
c = re.sub(r'<a href="#cotizar" class="btn btn-primary">Solicitar Presupuesto para Alemania</a>',
           r'<a href="#cotizar" class="btn btn-primary" data-i18n="lp-ger-btn">Solicitar Presupuesto para Alemania</a>', c)
c = re.sub(r'<h2 class="section-title">Por qué elegirnos para Alemania</h2>',
           r'<h2 class="section-title" data-i18n="lp-why">Por qué elegirnos para Alemania</h2>', c)
c = re.sub(r'<h3>Dominio de la Normativa Alemana</h3>', r'<h3 data-i18n="lp-ger-f1-t">Dominio de la Normativa Alemana</h3>', c)
c = re.sub(r'<p>Los recintos alemanes son los más estrictos de Europa\. Gestionamos los certificados de estática \(Statik\), normativas B1 ignífugas y permisos eléctricos\. Cero sorpresas\.</p>',
           r'<p data-i18n="lp-ger-f1-d">Los recintos alemanes son los más estrictos de Europa. Gestionamos los certificados de estática (Statik), normativas B1 ignífugas y permisos eléctricos. Cero sorpresas.</p>', c)
c = re.sub(r'<h3>Logística Transfronteriza Impecable</h3>', r'<h3 data-i18n="lp-ger-f2-t">Logística Transfronteriza Impecable</h3>', c)
c = re.sub(r'<p>Fabricamos en nuestro taller y transportamos directamente a tu pabellón en Alemania\. Nuestro equipo viaja para garantizar un montaje perfecto con calidad in-house\.</p>',
           r'<p data-i18n="lp-ger-f2-d">Fabricamos en nuestro taller y transportamos directamente a tu pabellón en Alemania. Nuestro equipo viaja para garantizar un montaje perfecto con calidad in-house.</p>', c)
c = re.sub(r'<h3>Servicio Llave en Mano Real</h3>', r'<h3 data-i18n="lp-ger-f3-t">Servicio Llave en Mano Real</h3>', c)
c = re.sub(r'<p>Tú solo viajas para vender\. Nosotros nos encargamos del diseño 3D, fabricación modular o custom, audiovisuales y desmontaje\.</p>',
           r'<p data-i18n="lp-ger-f3-d">Tú solo viajas para vender. Nosotros nos encargamos del diseño 3D, fabricación modular o custom, audiovisuales y desmontaje.</p>', c)
with open('montaje-stands-ferias-alemania.html', 'w', encoding='utf-8') as f:
    f.write(c)

# Page: AMSTERDAM
with open('montaje-stands-amsterdam-holanda.html', 'r', encoding='utf-8') as f:
    c = f.read()
c = add_lang_selector(c)
c = add_i18n_form(c)
c = re.sub(r'<h1 class="hero-title">Arquitectura Ferial Premium en <br><span class="animated-text">Ámsterdam</span></h1>',
           r'<h1 class="hero-title"><span data-i18n="lp-ams-h1-first">Arquitectura Ferial Premium en</span> <br><span class="animated-text" id="animatedText" data-i18n="lp-ams-h1-second">Ámsterdam</span></h1>', c)
c = re.sub(r'<p class="hero-subtitle">Especialistas en diseño custom y stands modulares para RAI Amsterdam\. Estructuras sostenibles y de alto impacto para ferias internacionales\.</p>',
           r'<p class="hero-subtitle" data-i18n="lp-ams-sub">Especialistas en diseño custom y stands modulares para RAI Amsterdam. Estructuras sostenibles y de alto impacto para ferias internacionales.</p>', c)
c = re.sub(r'<a href="#cotizar" class="btn btn-primary">Cotizar Stand en Ámsterdam</a>',
           r'<a href="#cotizar" class="btn btn-primary" data-i18n="lp-ams-btn">Cotizar Stand en Ámsterdam</a>', c)
c = re.sub(r'<h2 class="section-title">Valor Diferencial para Países Bajos</h2>',
           r'<h2 class="section-title" data-i18n="lp-ams-why">Valor Diferencial para Países Bajos</h2>', c)
c = re.sub(r'<h3>Green Exhibiting \(Sostenibilidad\)</h3>', r'<h3 data-i18n="lp-ams-f1-t">Green Exhibiting (Sostenibilidad)</h3>', c)
c = re.sub(r'<p>Holanda exige estándares ecológicos altos\. Construimos stands con materiales reutilizables \(sistemas modulares premium\) reduciendo drásticamente la huella de carbono\.</p>',
           r'<p data-i18n="lp-ams-f1-d">Holanda exige estándares ecológicos altos. Construimos stands con materiales reutilizables (sistemas modulares premium) reduciendo drásticamente la huella de carbono.</p>', c)
c = re.sub(r'<h3>Aprovechamiento del Espacio</h3>', r'<h3 data-i18n="lp-ams-f2-t">Aprovechamiento del Espacio</h3>', c)
c = re.sub(r'<p>Optimizamos tu inversión en suelo ferial con diseños de doble altura \(Double-Decker\) y distribución estratégica para zonas de networking y demostración de producto\.</p>',
           r'<p data-i18n="lp-ams-f2-d">Optimizamos tu inversión en suelo ferial con diseños de doble altura (Double-Decker) y distribución estratégica para zonas de networking y demostración de producto.</p>', c)
with open('montaje-stands-amsterdam-holanda.html', 'w', encoding='utf-8') as f:
    f.write(c)

# Page: ESPANA
with open('montaje-stands-ferias-espana.html', 'r', encoding='utf-8') as f:
    c = f.read()
c = add_lang_selector(c)
c = add_i18n_form(c)
c = re.sub(r'<h1 class="hero-title">Tu Partner Local para Ferias en <br><span class="animated-text">Toda España</span></h1>',
           r'<h1 class="hero-title"><span data-i18n="lp-esp-h1-first">Tu Partner Local para Ferias en</span> <br><span class="animated-text" id="animatedText" data-i18n="lp-esp-h1-second">Toda España</span></h1>', c)
c = re.sub(r'<p class="hero-subtitle">Fabricación propia, diseño 3D y montaje en los principales recintos del país: IFEMA \(Madrid\), Fira \(Barcelona\), BEC \(Bilbao\) y Feria Valencia\.</p>',
           r'<p class="hero-subtitle" data-i18n="lp-esp-sub">Fabricación propia, diseño 3D y montaje en los principales recintos del país: IFEMA (Madrid), Fira (Barcelona), BEC (Bilbao) y Feria Valencia.</p>', c)
c = re.sub(r'<a href="#cotizar" class="btn btn-primary">Contactar con un Especialista</a>',
           r'<a href="#cotizar" class="btn btn-primary" data-i18n="lp-esp-btn">Contactar con un Especialista</a>', c)
c = re.sub(r'<h2 class="section-title">Cobertura y Agilidad</h2>',
           r'<h2 class="section-title" data-i18n="lp-esp-why">Cobertura y Agilidad</h2>', c)
c = re.sub(r'<h3>Producción Propia sin Intermediarios</h3>', r'<h3 data-i18n="lp-esp-f1-t">Producción Propia sin Intermediarios</h3>', c)
c = re.sub(r'<p>Tenemos el control total de los tiempos y acabados porque todo sale de nuestro propio taller\. Fabricación nacional con calidad premium\.</p>',
           r'<p data-i18n="lp-esp-f1-d">Tenemos el control total de los tiempos y acabados porque todo sale de nuestro propio taller. Fabricación nacional con calidad premium.</p>', c)
c = re.sub(r'<h3>Cobertura Nacional Total</h3>', r'<h3 data-i18n="lp-esp-f2-t">Cobertura Nacional Total</h3>', c)
c = re.sub(r'<p>Llegamos a cualquier recinto ferial de España con transporte propio y nuestro equipo de montadores y electricistas certificados\.</p>',
           r'<p data-i18n="lp-esp-f2-d">Llegamos a cualquier recinto ferial de España con transporte propio y nuestro equipo de montadores y electricistas certificados.</p>', c)
with open('montaje-stands-ferias-espana.html', 'w', encoding='utf-8') as f:
    f.write(c)

print("HTML pages updated with data-i18n.")
