[//]: # "// x-release-please-start-version"

![Latest Release](https://img.shields.io/badge/latest_release-amber?style=plastic&label=0.2.0)

[//]: # "// x-release-please-end"

![Release Workflow](https://git.3caravelle.net/3Caravelle/renovate/actions/workflows/release-please.yml/badge.svg?branch=main)

# Preset Renovate per l'organizzazione

Questo repository contiene una serie di preset condivisi per [Renovate](https://docs.renovatebot.com/), pensati per essere riutilizzati in tutti i progetti dell'organizzazione.  
L'obiettivo è avere regole consistenti per l'aggiornamento delle dipendenze, riducendo il rumore e migliorando la sicurezza.

## Struttura del repository

- `default.json`: regole base valide per tutti i repository.
- `node.json`: regole aggiuntive pensate per progetti Node.js / frontend.
- `spring.json`: regole aggiuntive per progetti Java basati su Spring / Maven.
- `docker.json`: configurazioni specifiche per immagini Docker.

## Cosa fa il preset `default`

Il file `default.json` definisce il comportamento comune di Renovate:

- Estende la configurazione consigliata di Renovate (`config:best-practices`).
- Imposta il fuso orario su `Europe/Rome`.
- Limita le esecuzioni alla mattina presto, prima delle 08:00 da lunedì a giovedì.
- Evita aggiornamenti troppo “freschi” con `minimumReleaseAge: 2 days`.
- Mantiene separati aggiornamenti major da minor/patch.
- Definisce alcuni gruppi di dipendenze (test/QA, CI/CD, frontend tooling).
- Aggiunge (per dipendenze con sorgente GitHub) un badge OpenSSF Scorecard nel corpo delle PR.
- Abilita la manutenzione dei lockfile (lunedì prima delle 04:00).
- Usa etichetta comune `dependencies` per tutte le PR di Renovate.
- Abilita i semantic commits per le PR generate dal bot.

Questo preset dovrebbe essere esteso da tutti i repository come base comune.

## Preset specifici

### `node.json`

Preset da usare nei progetti Node.js / frontend:

- Crea gruppi per l'ecosistema Vue/Nuxt (`vue`, `@vue`, `nuxt`, `vite`, ecc.).
- Raggruppa le dipendenze di linting e formattazione (`eslint`, `prettier`).
- Abilita l'automerge per gli aggiornamenti di tipo `patch`.
- Mantiene manuali e ben visibili gli aggiornamenti `major` (con label `major-update`).

### `spring.json`

Preset per progetti Java basati su Spring:

- Gruppo dedicato per l'ecosistema Spring Boot (`org.springframework.*`, `spring-boot-starter`, `spring-cloud`, ecc.) con:
  - `matchManagers: maven`
  - `separateMajorMinor: true`
  - `minimumReleaseAge: 3 days`
- Gruppo per i principali plugin Maven (compiler, surefire, failsafe, jib).
- Disabilita l'automerge per i driver database (`postgresql`, `mysql`, ecc.) e li marca come più prioritari (`labels: ["critical"]`).

### `docker.json`

Preset per immagini Docker:

- Raggruppa le immagini Docker “base” con `minimumReleaseAge: 3 days` e separazione degli aggiornamenti `minor` e `patch`.
- Crea un gruppo dedicato alle immagini runtime (ad es. `postgres`, `mysql`, `mariadb`, `mongo`, `redis`, `nginx`, `rabbitmq`), per le quali l'automerge è disabilitato.
- Crea un gruppo per le immagini di tooling (`node`, `openjdk`, `maven`, `gradle`).
- Abilita l'automerge per aggiornamenti `digest` e per `patch` delle immagini di tooling (escluse le runtime).
- Disabilita l'automerge per gli aggiornamenti di tipo `major` e li marca con la label `major-update`.

## Come usare questi preset nei progetti

All'interno del repository applicativo, crea o aggiorna il file di configurazione di Renovate (ad esempio `renovate.json`) facendo estendere il preset condiviso.

### Esempio: utilizzo del preset di default

```jsonc
{
  "extends": ["gitea>3Caravelle/renovate"],
}
```

> Nota: per un repository con `default.json` alla radice è sufficiente usare il nome del repository, senza specificare `:default`.

### Esempio: progetto Node.js

```jsonc
{
  "extends": ["gitea>3Caravelle/renovate", "gitea>3Caravelle/renovate:node"],
}
```

### Esempio: progetto Spring / Maven

```jsonc
{
  "extends": ["gitea>3Caravelle/renovate", "gitea>3Caravelle/renovate:spring"],
}
```

### Esempio: progetto con riferimento a tag repository Renovate

```jsonc
{
  "extends": ["gitea>3Caravelle/renovate#v1.0.0"],
}
```

## Contributi

Per modificare o proporre nuove regole:

- apri una PR su questo repository;
- descrivi chiaramente lo use case e l'impatto atteso;
- assicurati che le modifiche siano coerenti con la filosofia generale (basso rumore, maggiore sicurezza).

Per maggiori dettagli, vedi anche `CONTRIBUTING.md`.
