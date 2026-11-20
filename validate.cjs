#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
function load(){const c=vm.createContext({});for(const f of ['rules','data','modules','monsters','wilds','treasure','adventures'])vm.runInContext(fs.readFileSync(path.join(__dirname,f+'.js'),'utf8'),c,{filename:f+'.js'});return c.E;}
const E=load();
assert.equal(E.modules.length,4);assert.equal(E.adventures.length,54);
assert.ok(Object.keys(E.monsters).length>=330);assert.ok(Object.keys(E.items).length>=290);assert.ok(Object.keys(E.spells).length>=70);
assert.equal(Object.keys(E.treasureTypes).length,26);
assert.equal(JSON.stringify(E.maps),JSON.stringify(load().maps),'map generation changed between loads');
for(const i of Object.values(E.items))if(i.spell)assert.ok(E.spells[i.spell],i.id);
for(const c of E.company(20)){assert.ok(E.items[c.weapon]);assert.ok(E.items[c.armor]);for(const k of [...c.book,...Object.keys(c.prepared)])assert.ok(E.spells[k],k);}
for(const cls of Object.keys(E.classes))for(let l=2;l<=20;l++)assert.ok(E.xpAt(cls,l)>E.xpAt(cls,l-1),cls+' '+l);
for(const band of E.tiers){const m=E.adventures.filter(m=>m.generated&&m.min===band.min);assert.equal(m.length,10);assert.deepEqual([1,2,3,4].map(s=>m.filter(x=>x.size===s).length),[4,3,2,1]);}
function exit(f){assert.ok(E.maps[f.to],`missing map ${f.to}`);const l=E.maps[f.to];const [x,y,d]=f.at;assert.ok(E.walkable(l,x,y),`invalid exit ${f.label} → ${l.id} (${x}, ${y})`);assert.ok(d>=0&&d<4);}
for(const m of E.adventures){assert.ok(E.monsters[m.boss],m.boss);for(const d of m.depth)for(const id of d.slice(2))assert.ok(E.monsters[id],id);for(const id of E.stock(m))assert.ok(E.items[id],id);const w=m.wild;assert.ok(w.tiles.every(r=>r.length===w.w));assert.ok(w.tiles.flat().every(t=>E.terrain[t]));const seen=new Set(E.flood(w,w.spawn,(x,y)=>Number.isFinite(E.terrain[w.tiles[y]?.[x]]?.cost)).map(([x,y])=>E.at(x,y)));for(const f of Object.values(w.sites)){assert.ok(seen.has(E.at(f.x,f.y)),m.id+' '+f.label);if(f.to)exit(f);}}
for(const l of Object.values(E.maps)){assert.ok(l.tiles.every(r=>r.length===l.w),l.id+' rectangular');assert.ok(E.walkable(l,...l.spawn),l.id+' spawn');const reachable=new Set(E.flood(l,l.spawn).map(([x,y])=>E.at(x,y)));const secrets=Object.values(l.features).filter(f=>f.kind==='secret');const startNetwork=new Set(E.flood(l,l.spawn,(x,y)=>E.walkable(l,x,y)&&l.features[E.at(x,y)]?.kind!=='secret').map(([x,y])=>E.at(x,y)));const traps=Object.values(l.traps);if(l.depth){assert.ok(secrets.length>=1&&secrets.length<=3,l.id+' secrets');assert.ok(traps.length>=2&&traps.length<=3,l.id+' traps');}
  for(let y=0;y<l.h;y++)for(let x=0;x<l.w;x++)if(E.walkable(l,x,y))assert.ok(reachable.has(E.at(x,y)),l.id+' disconnected '+E.at(x,y));
  for(const f of Object.values(l.features)){const near=E.neighbors.some(([dx,dy])=>startNetwork.has(E.at(f.x+dx,f.y+dy)));assert.ok(near||startNetwork.has(E.at(f.x,f.y)),l.id+' feature '+f.label);if(f.to)exit(f);if(f.type)assert.ok(E.treasureTypes[f.type]);}
  for(const [k,group] of Object.entries(l.foes)){assert.ok(startNetwork.has(k),l.id+' foe '+k);for(const id of group.ids)assert.ok(E.monsters[id],l.id+' '+id);}
  for(const t of traps)assert.ok(startNetwork.has(E.at(t.x,t.y)),l.id+' trap '+t.kind);
}
console.log(`Validated ${E.adventures.length} adventures, ${Object.keys(E.maps).length} local maps, ${Object.keys(E.monsters).length} monsters, ${Object.keys(E.items).length} items and ${Object.keys(E.spells).length} spells.`);
