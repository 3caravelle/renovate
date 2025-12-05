# Linee guida per contribuire

Grazie per il tuo interesse nel contribuire a questo repository di preset Renovate!

Questo documento definisce alcune regole e buone pratiche per proporre modifiche in modo ordinato e coerente con la filosofia del progetto.

## Obiettivi del repository

Questi preset sono pensati per:

- fornire una base comune per tutti i progetti dell'organizzazione;
- ridurre il “rumore” generato dalle PR di aggiornamento;
- migliorare la sicurezza mantenendo le dipendenze aggiornate in modo controllato;
- gestire in modo esplicito i casi sensibili (es. driver DB, runtime Java, major updates).

Quando proponi una modifica, chiediti sempre:

- questo cambiamento riduce o aumenta il rumore?
- rende più chiaro il comportamento di Renovate?
- può avere impatti imprevisti su molti repository?

## Struttura dei file

I preset principali sono:

- `default.json`: base comune per tutti i progetti;
- `node.json`: regole specifiche per progetti Node.js / frontend;
- `spring.json`: regole specifiche per progetti Spring / Maven;
- `docker.json`: eventuali regole per immagini Docker.

Per nuovi ecosistemi o tecnologie, preferisci:

- creare un nuovo file `xyz.json` dedicato;
- mantenere `default.json` relativamente generico;
- documentare il nuovo preset nel `README.md`.

## Stile e convenzioni

Quando modifichi o aggiungi regole Renovate:

- mantieni i file formattati come JSON (o JSONC se usi commenti `//`) in linea con `.editorconfig`;
- usa `groupName` chiari e descrittivi (es. “Spring Boot ecosystem”, “Lint & formatting”);
- usa `matchPackagePatterns` espliciti e il più possibile stabili;
- limita l'uso di `automerge: true` solo a casi a basso rischio (tipicamente `patch`);
- evita automerge per:
  - aggiornamenti `major`;
  - componenti critici (DB driver, runtime, security-critical);
- usa `labels` per evidenziare PR importanti (es. `major-update`, `critical`, `db-driver`).

### Commenti e spiegazioni

Se aggiungi regole non ovvie, aggiungi un breve commento `//` vicino alla regola per spiegare il motivo della scelta (in inglese o italiano semplice).

Esempio:

```jsonc
{
  // No automerge for DB driver upgrades
  "matchPackagePatterns": ["postgresql", "mysql"],
  "automerge": false,
}
```

## Processo per proporre modifiche

1. **Apri una issue (facoltativo ma consigliato)**
   - descrivi il problema o l'esigenza (es. “troppe PR per librerie di test”, “mancano regole per ecosistema X”);
   - se possibile, porta esempi concreti da un repository reale.

2. **Crea una branch dedicata**
   - usa un nome descrittivo, ad esempio `feat/node-preset-vue`, `chore/tune-spring-db-rules`.

3. **Modifica i file di configurazione**
   - tocca solo i file strettamente necessari;
   - mantieni la struttura e l'ordinamento consistente con quella esistente;
   - aggiorna il `README.md` se aggiungi o cambi il significato di un preset.

4. **Test locali (facoltativi ma raccomandati)**
   - se possibile, usa il preset modificato in un repository di prova per verificare il comportamento di Renovate (soprattutto in caso di cambiamenti invasivi);
   - controlla che la configurazione sia valida rispetto allo schema Renovate (es. usando strumenti di validazione JSON o la documentazione ufficiale).

5. **Apri una Pull Request**
   - descrivi chiaramente:
     - il problema che stai risolvendo;
     - il comportamento precedente e quello nuovo;
     - eventuali rischi o breaking change;
   - includi link o riferimenti a issue e/o repository di esempio, se presenti.

## Revisione e merge

- Le PR saranno riviste da almeno una persona con esperienza su Renovate o sui progetti interessati.
- Modifiche che impattano molti repository o introducono automerge su componenti sensibili potrebbero richiedere più discussione.
- L'automerge su branch di questa repo **non** è abilitato: il merge sarà sempre esplicito.

## Domande e supporto

Se hai dubbi su come modellare una regola o sull'impatto di un cambiamento:

- apri una issue con il tag `question` o `discussion`;
- oppure proponi direttamente una PR “draft” per discuterne sul codice.

Grazie per contribuire a mantenere i preset Renovate dell'organizzazione chiari, sicuri e coerenti!
