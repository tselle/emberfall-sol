E.spells={}; E.items={};
const spellRows={wizard:[
'Ember Dart:bolt:1d6+1:7|Sleep Cloud:sleep:2:6:1|Witchlight:bolt:1d8:5|Glass Ward:guard:3:0|Frost Touch:slow:1d4:1|Ash Veil:guard:2:4|Force Needle:bolt:1d4+2:8',
'Stinking Cloud:cloud:2:6:1|Scorching Ray:bolt:2d6:7|Mirror Shell:guard:4:0|Icy Web:slow:1d8:6:2|Drowse: sleep:3:5|Mothskin:guard:3:5',
'Cinderburst:bolt:5d6:8:2|Chain Spark:bolt:4d6:8:1|Quickening:haste:3:5:1|Rain of Knives:bolt:3d6:7:2|Pale Lantern:slow:2d6:8|Nightmare:sleep:2:6:2',
'Rime Storm:slow:4d6:8:2|Phantom Aegis:guard:5:6:2|Coil of Smoke:cloud:3:7:2|Ember Lance:bolt:6d6:8|Iron Grip:slow:3d6:5',
'Black Hail:bolt:6d6:8:2|Sunless Sleep:sleep:4:8:2|Wall of Cinders:bolt:5d6:7:2|Echo Ward:guard:6:6:2',
'Forked Comet:bolt:8d6:9:2|Frost Coffin:slow:6d6:7:2|Silver Swiftness:haste:5:7:2|Fog of Lethe:cloud:4:8:2',
'Rain of Stars:bolt:10d6:9:2|Hourglass:slow:7d6:8:3|Dream Prison:sleep:5:9:2|Crimson Mantle:guard:7:7:3',
'Eclipse Fire:bolt:12d6:9:3|Prism Lance:bolt:13d6:9|Unraveling Mist:cloud:5:8:3|Echo of Winter:slow:9d6:8:3',
'Falling Firmament:bolt:15d6:10:3|Last Midnight:sleep:6:9:3|Crown of Glass:guard:9:8:3|Ash of Ages:bolt:14d6:10:3'],priest:[
'Mend Wounds:heal:1d8:3|Sun Knell:bolt:1d6+1:5|Pilgrim’s Blessing:guard:3:5:1|Stillness:sleep:2:4',
'Warm Hands:heal:2d6:4|Root Snare:slow:1d8:5:1|Dawn Guard:guard:4:5|Silver Thorn:bolt:2d6:6',
'Lantern Circle:heal:2d6:5:1|Sacred Flame:bolt:3d6:6:1|Restful Hymn:cleanse:0:5:1|Vow of Haste:haste:3:4',
'Mend Deep Wounds:heal:3d8:5|Oathfire:bolt:5d6:7|Quiet Earth:slow:3d6:6:2|Banner of Mercy:guard:5:6:2',
'Dawn Chorus:heal:3d8:6:2|Judgment:bolt:6d6:8:1|Sanctuary:guard:6:6:2|Hymn of Returning:cleanse:0:6:2',
'Pillars of Noon:bolt:8d6:8:2|Golden Rain:heal:4d8:7:2|Stonesong:slow:5d6:7:2|Blessed March:haste:5:6:2',
'Star of Renewal:heal:6d8:8:3|Light of the First Hearth:bolt:10d6:9:3|Final Benediction:guard:8:8:3|Banish the Night:cleanse:0:8:3']};
E.slug=s=>s.toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/ +/g,'-');
Object.entries(spellRows).forEach(([school,levels])=>levels.forEach((row,i)=>row.split('|').forEach(text=>{let [name,kind,power,range,area]=text.split(':');const id=E.slug(name);E.spells[id]={id,name,school,lvl:i+1,kind:kind.trim(),power,range:+range,area:+area||0};})));
E.addItem=(id,name,type,price,opt={})=>E.items[id]={id,name,type,price,...opt};
const weapons=[['iron-sword','Iron Longsword','1d8',24],['iron-dagger','Iron Dagger','1d4',8],['ash-staff','Ashwood Staff','1d6',10],['iron-mace','Iron Mace','1d6+1',20],['shortbow','Yew Shortbow','1d6',32,7],['war-axe','Bearded Axe','1d8',26],['sling','Riverstone Sling','1d4',7,6],['longbow','Hawthorn Longbow','1d8',52,9],['warhammer','Bell Hammer','1d8',32],['spear','Boar Spear','1d6',13,3],['crossbow','Iron Crossbow','1d8',43,8],['greatsword','March Greatsword','1d10',56],['flail','Chain Flail','1d8',31],['sabre','Dusk Sabre','1d8',27],['moon-sickle','Moon Sickle','1d6',22],['hand-axe','Hand Axe','1d6',16,3],['morningstar','Briar Morningstar','2d4',42],['ember-bow','Ember Bow','2d4',75,9],['bone-knife','Bone Knife','1d4',10],['pike','Ashguard Pike','1d8',34,2],['reed-pipe','Reed Blowpipe','1d4',14,6],['copper-khopesh','Copper Khopesh','1d8',31],['bridge-maul','Bridge Maul','2d4',36],['watch-rapier','Watch Rapier','1d6+1',28]];
const armor=[['leather','Stitched Leather',8,35],['studded','Studded Leather',7,60],['mail','Ring Mail',6,85],['scale','Scale Coat',5,115],['chain','Chain Hauberk',4,175],['plate','March Plate',2,550],['robes','Traveler’s Robes',9,23],['brigandine','Brigandine',5,140]];
weapons.forEach(([id,name,damage,price,range=1])=>{for(let n=0;n<=5;n++)E.addItem(id+(n?`+${n}`:''),name+(n?` +${n}`:''),'Weapon',price+(n?150*n*n:0),{damage,range,bonus:n,tier:n});});
armor.forEach(([id,name,ac,price])=>{for(let n=0;n<=5;n++)E.addItem(id+(n?`+${n}`:''),name+(n?` +${n}`:''),'Armour',price+(n?210*n*n:0),{ac:ac-n,tier:n});});
for(const s of Object.values(E.spells)){E.addItem('scroll-'+s.id,`Scroll of ${s.name}`,'Scroll',27*s.lvl,{spell:s.id,tier:Math.floor((s.lvl-1)/2)});if(['bolt','heal','cloud','slow'].includes(s.kind)&&s.lvl<=6)E.addItem('wand-'+s.id,`Wand of ${s.name}`,'Wand',90*s.lvl,{spell:s.id,charges:5,tier:Math.floor(s.lvl/2)});}
[['red-tonic','Redleaf Tonic','1d8'],['honey','Pilgrim’s Honey','2d8'],['silver-draught','Silver Draught','3d8'],['sun-elixir','Sunroot Elixir','5d8']].forEach(([id,name,heal],i)=>E.addItem(id,name,'Potion',22*(i+1),{heal,tier:i}));
E.addItem('smoke-pearl','Smoke Pearl','Relic',95,{tier:1});E.addItem('ward-ring','Lantern Ward Ring','Relic',230,{tier:2});
E.company=(level=1)=>[
 E.makeChar('Aldric Vane','Human','Fighter','Lawful Good',[17,12,16,10,11,14],0,level),
 E.makeChar('Brynn Ironroot','Dwarf','Cleric','Neutral Good',[14,10,17,11,17,9],1,level),
 E.makeChar('Silva Duskwhisper','Elf','Mage','Chaotic Good',[8,15,11,18,13,13],2,level),
 E.makeChar('Pip Underbough','Halfling','Thief','Chaotic Neutral',[10,18,13,12,10,15],3,level)
].map((c,i)=>{const gear=['mail','mail','robes','leather'][i];c.armor=gear;c.ac=E.items[gear].ac;return c;});
