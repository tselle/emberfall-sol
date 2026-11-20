# Emberfall: The Emberwild Saga

A standalone browser RPG about the last towns at the edge of the Emberwild. Lead up to six adventurers through first-person towns and cellars, travel across the wilderness, and fight on an isometric tactical grid.

## Play

Open `index.html` directly. No build, library, asset download, or server is required. To share the game, serve the folder as static files, either at a site root or under a subdirectory. For example:

```sh
python3 -m http.server 8000
```

Start in Thornwick with the ready-made company. **Interact** at Lantern Gate, accept Warden Maren’s commission, then head north to the cellar gate. Use **Manage Company** to recruit characters. The Campaign Atlas also lets you bring your company to other adventures or start one with a company at its recommended level.

| Input | Command |
| --- | --- |
| W/S or ↑/↓ | Step forward/back; north/south on the regional map |
| A/D or ←/→ | Turn; west/east on the regional map |
| Q/E | Sidestep |
| Enter | Interact with a feature ahead or underfoot |
| F / R | Search / camp |
| M / J / B / I | Map / journal / bestiary / inventory |
| 1–6 | Character sheet |
| Esc / ? | Close or open menu / help |

On touch screens, tap the command buttons and movement pad, or swipe on the scene. In combat, select an action, then tap a tile or a unit. **Auto-fight** plays turns for the company; toggle it again to take over. You can also flee.

Progress autosaves outside combat. The menu has three manual slots. Saves are kept in the current browser’s local storage, not synced; moving to a different browser or serving origin will not carry them over. Browsers that block storage for local files may require the static-server option to save.

## Content and rules

- Four story commissions: *The Cellars of Thornwick*, *The Hollow Vaults*, *Barrow of the Iron King*, and *The Witch-Queen of Ravenmoor*.
- Fifty seeded expeditions across five level bands, each with a home town, a wilderness route, and multiple dungeon levels. Separate seed namespaces isolate geometry, quests, wilderness, treasure, traps, and secret placement.
- 333 original monster entries (including regional variants), 305 items, 72 wizard and priest spells, and 26 lettered treasure tables.
- Second-edition-inspired browser rules: descending AC, THAC0, class XP and saves, memorized spells, and training through level 20. Spells, monsters, and equipment are Emberfall adaptations, not an exhaustive reproduction of a tabletop rulebook or bestiary.
- All scenes, sprites, portraits, and maps are generated in JavaScript and Canvas. There are no external art, font, or sound dependencies.

## Development and checks

Runtime files are ordinary scripts loaded in dependency order from `index.html`. The first seven scripts define rules and content. `figures.js` and `view3d.js` generate the art and render exploration. Feature modules handle combat, travel, campaign, journal, maps, bestiary, touch controls, and exploration events. `game.js` wires them together and owns persistence. `style.css` is the only stylesheet.

```sh
node validate.cjs
node smoke.cjs                 # Node 22+ and Chrome
CHROME=chromium node smoke.cjs # override the browser binary
```

The validator checks deterministic generation, content references, treasure tables, map connectivity including hidden alcoves, and exit destinations. The Chrome smoke test opens the game from disk and checks the opening commission, dungeon entry, combat, wilderness, save/load, campaign travel, and a phone-width layout. The renderer uses a small pixel buffer and redraws on state changes or during movement; Chrome is automated here, but Safari and physical iPad performance should be checked on-device.

MIT licensed. See [LICENSE](LICENSE).
