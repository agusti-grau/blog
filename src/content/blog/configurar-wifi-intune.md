---
title: "Com configurar un perfil de Wi-Fi corporativa amb Microsoft Intune"
description: "Guia pas a pas per desplegar perfils de Wi-Fi corporativa als dispositius Windows gestionats amb Microsoft Intune, incloent exemples de PowerShell i resolució de problemes comuns."
pubDate: 2025-01-15
tags: ["Intune", "Windows"]
author: "Agustí Grau"
lang: "ca"
---

## Introducció

Configurar una xarxa Wi-Fi corporativa als dispositius dels usuaris és una de les tasques fonamentals per a qualsevol administrador de sistemes. Microsoft Intune ens permet desplegar perfils de Wi-Fi de forma centralitzada i automatitzada, evitant que els usuaris hagin d'introduir manualment les credencials. En aquest article veurem com crear, configurar i desplegar un perfil de Wi-Fi corporativa amb Intune pas a pas, incloent exemples pràctics amb PowerShell per a la verificació del desplegament.

## Requisits previs

- Una subscripció de Microsoft Intune (inclosa a EMS E3/E5 o Microsoft 365 E3/E5)
- Dispositius Windows 10/11 inscrits a Intune
- Un certificat PKI o credencials per a l'autenticació WPA2-Enterprise
- Permisos d'administrador a l'Intune Admin Center
- Accés al servei d'Active Directory o Azure AD

## Pas 1: Crear el perfil de Wi-Fi a Intune

El primer pas és accedir al centre d'administració de Microsoft Intune i crear un perfil de configuració de dispositiu.

1. Accedeix a [intune.microsoft.com](https://intune.microsoft.com)
2. Navega a **Dispositius** > **Perfils de configuració** > **Crear perfil**
3. Selecciona:
   - **Plataforma:** Windows 10 and later
   - **Tipus de perfil:** Wi-Fi
4. Fes clic a **Crea**

## Pas 2: Configurar els paràmetres de la xarxa

A la finestra de configuració, omple els camps següents:

- **Nom del perfil:** `Wi-Fi Corporativa`
- **Descripció:** `Perfil de Wi-Fi per a la xarxa corporativa`
- **SSID:** El nom exacte de la teva xarxa Wi-Fi
- **Tipus de seguretat:** WPA2-Enterprise
- **Mètode d'autenticació:** Certificat d'usuari o màquina

## Pas 3: Assignar el perfil als grups

Un cop configurat, assigna el perfil a un grup d'usuaris o dispositius:

1. A la secció **Assignacions**, selecciona **Afegeix grup**
2. Tria el grup d'Azure AD que contingui els dispositius o usuaris objectiu
3. Configura les **Exclusions** si cal evitar certs dispositius
4. Fes clic a **Següent** i després a **Crea**

## Pas 4: Verificar el desplegament amb PowerShell

Per comprovar que el perfil s'ha aplicat correctament als dispositius, pots utilitzar PowerShell:

```powershell
# Verificar perfils Wi-Fi aplicats
Get-WmiObject -Namespace "root\cimv2\mdm\dmmap" -Class MDM_WirelessProfile |
    Select-Object InstanceID, ParentID

# Comprovar l'estat de sincronització amb Intune
Get-ScheduledTask -TaskName "PushLaunch" |
    Select-Object State, LastRunTime

# Forçar la sincronització amb Intune
Start-Process "C:\Program Files (x86)\Microsoft Intune Management Extension\Microsoft.Management.Services.IntuneWindowsAgent.exe" `
    -ArgumentList "intunemanagementextension://synccompliance"
```

També pots utilitzar el cmdlet `netsh` per veure la llista de perfils Wi-Fi:

```powershell
# Llistar tots els perfils Wi-Fi del dispositiu
netsh wlan show profiles
```

## Problemes comuns

### El perfil no apareix al dispositiu

Verifica que el dispositiu estigui correctament sincronitzat amb Intune. Revisa l'apartat **Dispositius** > **Tots els dispositius** i selecciona el dispositiu per veure'n l'estat de configuració.

### Error d'autenticació

Assegura't que el certificat d'autenticació s'ha desplegat correctament al dispositiu. Sense un certificat vàlid, l'autenticació WPA2-Enterprise fallarà.

### Conflicte amb perfils existents

Si l'usuari ja té un perfil de Wi-Fi manual per a la mateixa xarxa, pot haver-hi conflictes. Recomano eliminar els perfils manuals previs amb:

```powershell
# Eliminar un perfil de Wi-Fi específic
netsh wlan delete profile name="NOM_DE_LA_XARXA"
```

## Conclusió

Desplegar perfils de Wi-Fi amb Microsoft Intune és un procés relativament senzill que estalvia hores de configuració manual. Amb una bona planificació prèvia (certificats, grups d'assignació i proves pilot), podràs automatitzar completament la connexió a la xarxa corporativa de tots els dispositius gestionats.

Recorda fer sempre una prova pilot amb un grup reduït d'usuaris abans de desplegar a tota l'organització!
