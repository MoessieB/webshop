# AutoShop Webshop

## Overzicht
AutoShop is een eenvoudige, volledig functionele e-commerce webshop gericht op auto-onderdelen en accessoires. Gebruikers kunnen producten bekijken, toevoegen aan hun winkelwagen en afrekenen. Beheerders kunnen via het adminpaneel producten beheren en bestellingen inzien.

## Functionaliteiten
- **Productweergave**: Bekijk een overzicht van auto-gerelateerde producten inclusief afbeelding, prijs en omschrijving.
- **Winkelwagen**: Voeg producten toe aan je winkelwagen, bekijk het totaalbedrag en wijzig producten eenvoudig.
- **Afrekenen**: Rond je bestelling af en sla het besteloverzicht lokaal op.
- **Adminpaneel**:
  - Voeg nieuwe producten toe met afbeelding, omschrijving en prijs.
  - Bewerk of verwijder bestaande producten.
  - Reset naar standaard producten.
  - Bekijk geplaatste bestellingen met datum/tijd en totaalprijs.

## Technologieën
- **HTML** – voor pagina-structuur
- **CSS (TailwindCSS)** – voor snelle en responsive styling
- **JavaScript** – voor dynamische functionaliteit
- **LocalStorage** – om producten en bestellingen lokaal op te slaan

## Structuur
- `index.html`: Hoofdpagina met alle producten
- `winkelkar.html`: Winkelwagenoverzicht
- `afreken.html`: Afrekenpagina
- `admin.html`: Beheerderspaneel
- `products.JSON`: Begindata voor producten
- `style.css`: Opmaak met Tailwind-utility classes
- `script.js`, `winkelkar.js`, `admin.js`: JavaScript-logica per pagina
- `images/`: Bevat productafbeeldingen en logo

## Hosting via Netlify
1. Maak een gratis account aan op [Netlify](https://netlify.com)
2. Upload de hele projectmap 
3. Klik op je nieuwe project in het dashboard
4. Deel de gegenereerde URL of koppel je eigen domeinnaam