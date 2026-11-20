E.modules=[
{id:'e0',act:'I',title:'The Cellars of Thornwick',town:'Thornwick',start:'Lantern Gate',tagline:'The last lanterns before the wilds.',region:'The Lantern March',min:1,max:2,patron:'Warden Maren',quest:'The Warden’s Commission',hook:'Speak with Warden Maren at the Lantern Gate.',brief:'Three nights ago the bell beneath Thornwick rang on its own. Now the millers won’t go below. Find what’s ringing it, and bring back the brass clapper.',side:'A Debt in Salt',sideText:'Find the miller’s salt ledger in the old stores.',relic:'Brass Bell Clapper',sideRelic:'Salt Ledger',boss:'bell-wight',gold:225,xp:1600,depth:[['Cellar Steps','The damp air smells of grain and cold iron.','grit-rat','cellar-skulk'],['The Sunk Stores','Tally marks march across the salt-stained walls.','mire-slime','lantern-bone'],['The Drowned Belfry','A bell tolls below the waterline.','lantern-bone','silt-ghoul']]},
{id:'e1',act:'II',title:'The Hollow Vaults',town:'Mothbridge',start:'The Reed Gate',tagline:'The bridge remembers every footstep.',region:'The Glasswater Fens',min:1,max:3,patron:'Archivist Venn',quest:'The Empty Catalogue',hook:'Meet Archivist Venn at the Reed Gate.',brief:'The vaults once kept our flood records. Yesterday my own name vanished from every ledger. Find the hollow seal before the river forgets us too.',side:'The Ferryman’s Due',sideText:'Return a lost river token to the archivist.',relic:'Hollow Seal',sideRelic:'River Token',boss:'vellum-mimic',gold:380,xp:2600,depth:[['Reed Chutes','Sodden paper clings to the steps.','silt-ghoul','mire-slime'],['Archive of Echoes','Footsteps on the far side match your own.','lantern-bone','copper-moth'],['The Blank Registry','Every shelf ends in a single locked drawer.','copper-moth','silt-ghoul']]},
{id:'e2',act:'III',title:'Barrow of the Iron King',town:'Halewatch',start:'The Iron Gate',tagline:'Here even the snow carries the taste of iron.',region:'The Frostiron Downs',min:3,max:5,patron:'Marshal Orva',quest:'The King Without a Crown',hook:'Speak with Marshal Orva at the Iron Gate.',brief:'When the last barrow banner fell, the war should have ended. Something is raising the banners again. Take the king’s crown before his soldiers remember their oaths.',side:'Names of the Fallen',sideText:'Recover the muster roll and bring it home.',relic:'Black Iron Crown',sideRelic:'Muster Roll',boss:'iron-king',gold:740,xp:5200,depth:[['Hall of Standards','Old rust stains the fallen banners.','ash-hound','lantern-bone'],['The Cold Muster','Empty greaves stand in perfect lines.','barrow-knight','silt-ghoul'],['Anvil of Kings','The floor rings like struck metal.','barrow-knight','ash-hound']]},
{id:'e3',act:'IV',title:'The Witch-Queen of Ravenmoor',town:'Crowmere',start:'The Crow Gate',tagline:'No one here lights a second candle.',region:'Ravenmoor',min:5,max:7,patron:'Keeper Els',quest:'The Queen’s Borrowed Face',hook:'Find Keeper Els at the Crow Gate.',brief:'The moor took our queen years ago. The woman wearing her face wants a tithe of names. Descend through the peat warrens and break her mirror.',side:'One Candle More',sideText:'Return the wick from the old watch altar.',relic:'Mirror of Black Peat',sideRelic:'Watch Altar Wick',boss:'witch-queen',gold:1300,xp:11000,depth:[['Peat Warrens','Roots follow you through the black water.','ash-hound','bog-serpent'],['Mirror Cloister','Your shadows cross the walls a heartbeat late.','barrow-knight','bog-serpent'],['The Raven Throne','Someone in the dark greets you by name.','bog-serpent','barrow-knight']]}
];
E.at=(x,y)=>x+','+y;
E.grid=(rows,id,name,theme,spawn)=>({id,name,theme,spawn,w:rows[0].length,h:rows.length,tiles:rows.map(r=>r.split('')),features:{},foes:{},traps:{},text:''});
E.put=(l,x,y,kind,label,extra={})=>l.features[E.at(x,y)]={x,y,kind,label,...extra};
E.makeTown=m=>{const l=E.grid([
'#############',
'######G######',
'#...#...#...#',
'#...........#',
'#...#...#...#',
'##S##...##T##',
'#...........#',
'#...H...I...#',
'#...#...#...#',
'#####...#####',
'#...#...#...#',
'#...........#',
'######W######'],m.id+'-town',m.town,'town',[6,11,0]);
E.put(l,6,10,'patron',m.patron);E.put(l,2,5,'shop','The Copper Anvil');E.put(l,10,5,'temple','Chapel of the First Hearth');E.put(l,4,7,'hall','Watch Hall');E.put(l,8,7,'inn','The Last Lantern');E.put(l,6,1,'gate','Old Cellar Gate',{to:m.id+'-d1',at:[8,12,0],quest:true});E.put(l,6,12,'wild','Road to the Wilds');return l;};
