# RETIRED — Do Not Deploy From Here

This `supabase/` tree under **digitallydefined-online-local** is RETIRED.

## Why
The canonical repo for ALL Supabase Edge Function deploys is:
**`digitallydefined-os-backend/supabase/`**

Both folders linked to the same Supabase project (`dijjlppdljpcgyoakdnq`),
which caused edge functions to overwrite each other. To avoid that, only the
backend repo deploys functions.

## Rules
- DO NOT run `supabase deploy` from this folder.
- DO NOT edit functions/migrations here as a source of truth.
- Deploy and edit functions ONLY from `digitallydefined-os-backend/supabase`.
- This tree is kept as historical reference only. Not deleted yet.
- It is also excluded from the Vercel website bundle via `.vercelignore`.