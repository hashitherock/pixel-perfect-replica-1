<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->


## Sholok project rules
- Frontend only: no backend, database or external APIs — the brief forbids them; all data lives in `src/data/`.
- Mock data and pure filter logic stay in `src/data/` separate from components, so a backend can replace it later.
- Shared client state (recent services, active demo profile) lives in a single provider in `src/lib/recent.tsx` mounted in `__root`.
