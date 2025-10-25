# 🔧 Configurar Capacidades de Google y Apple en Xcode

## 🚨 PROBLEMA ACTUAL
Los botones de "Continuar con Google" y "Continuar con Apple" aparecen pero **no funcionan**. Esto se debe a que las capacidades no están configuradas en Xcode.

## 📋 PASOS PARA SOLUCIONARLO

### 1. Abrir el Proyecto en Xcode
```bash
open ios/App/App.xcworkspace
```

### 2. Configurar Capacidades de Google

1. **Selecciona el target "App"** en el navegador del proyecto
2. Ve a la pestaña **"Signing & Capabilities"**
3. Haz clic en **"+ Capability"**
4. Busca y agrega **"Google Sign In"**
5. **Importante**: Necesitas agregar el **GoogleService-Info.plist** al proyecto si no está ya

### 3. Configurar Capacidades de Apple

1. En la misma pestaña **"Signing & Capabilities"**
2. Haz clic en **"+ Capability"**
3. Busca y agrega **"Sign in with Apple"**

### 4. Verificar URLs Schemes

1. Ve a **Info.plist** del proyecto
2. Agrega estas URLs schemes:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>GoogleSignIn</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>YOUR_REVERSED_CLIENT_ID</string>
        </array>
    </dict>
</array>
```

**Nota**: Reemplaza `YOUR_REVERSED_CLIENT_ID` con el valor del `REVERSED_CLIENT_ID` del archivo `GoogleService-Info.plist`.

### 5. Configurar AppDelegate

Verifica que `AppDelegate.swift` tenga:

```swift
import UIKit
import Capacitor
import FirebaseCore
import GoogleSignIn

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        
        // Configurar Google Sign In
        if let path = Bundle.main.path(forResource: "GoogleService-Info", ofType: "plist"),
           let plist = NSDictionary(contentsOfFile: path),
           let clientId = plist["CLIENT_ID"] as? String {
            GIDSignIn.sharedInstance.configuration = GIDConfiguration(clientID: clientId)
        }
        
        return true
    }
    
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }
}
```

## 🔍 VERIFICAR CONSOLA

Después de hacer estos cambios:

1. **Compila en Xcode** (⌘ + R)
2. **Abre Safari Developer Tools** (Safari > Develop > [Tu iPhone] > [Tu App])
3. **Prueba los botones** de Google/Apple
4. **Revisa la consola** para ver los logs que agregamos

## 📱 LOGS ESPERADOS

Si funciona correctamente, deberías ver:
```
Iniciando sesión con Google...
Google sign in exitoso
```

Si hay error, verás:
```
Error en Google sign in: [detalle del error]
```

## 🎯 PRÓXIMOS PASOS

1. Configura las capacidades en Xcode
2. Prueba los botones
3. Revisa los logs en Safari Developer Tools
4. Reporta qué errores aparecen (si los hay)

---

**¿Necesitas ayuda con algún paso específico?** 🚀
