# Personal Dashboard

Statische Web-App (GitHub Pages). Kein Tracking. Einziger Server: die Einkaufsliste kann über Supabase (Projekt Haushalt) mit Rik und dem Wohnungs-Cockpit geteilt werden. Externe Anfragen nur, wenn man in der Einkaufsliste ein Rezept einfügt: Links laufen über r.jina.ai, die Texterkennung für Screenshots wird einmalig von cdn.jsdelivr.net geladen (Bild bleibt auf dem Gerät).
Alle anderen Einträge bleiben im Browser des Geräts (localStorage) und landen nie in diesem Repository oder auf einem Server.


## Gemeinsame Einkaufsliste

Nur die Einkaufsliste wird geteilt, sonst nichts. Einrichten im Reiter Einkauf unter **Gemeinsame Liste**: Adresse, Schlüssel und Haushaltscode eintragen, **Verbinden**. Danach **Link fürs zweite Gerät** antippen und den Link privat schicken.

- Speicher: Supabase-Projekt Haushalt (Region Frankfurt). Tabellen sind für den öffentlichen Schlüssel gesperrt, Zugriff nur über `hh_pull` und `hh_push` mit Haushaltscode.
- Abgleich pro Eintrag, die neuere Änderung gewinnt. Offline geht alles weiter und gleicht später ab.
- Haushaltscode und Schlüssel nie hier ins Repo schreiben, das Repo ist öffentlich.
