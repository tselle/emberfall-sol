E.monsters={};
E.beast=(id,name,hd,ac,damage,xp,skin,desc,opt={})=>E.monsters[id]={id,name,hd,ac,damage,xp,skin,desc,hp:Math.max(2,Math.round(hd*5)),th:Math.max(1,20-Math.floor(hd)),sv:[14,16,15,17,17].map(v=>Math.max(3,v-Math.floor(hd/2))),morale:7,...opt};
E.beast('grit-rat','Grit Rat',.5,7,'1d3',22,'rat','A fist-sized rat with teeth chipped on cellar stone.');
E.beast('cellar-skulk','Cellar Skulk',1,7,'1d4',40,'goblin','A low, quick scavenger in a coat stitched from flour sacks.',{ambush:true});
E.beast('mire-slime','Mire Slime',1.4,8,'1d4',70,'slime','Pale bubbles rise through this shapeless pool of ooze.',{resist:0});
E.beast('lantern-bone','Lantern Bone',1.5,6,'1d6',95,'skeleton','Candle stubs burn in the sockets of a drowned watchman.',{undead:1});
E.beast('silt-ghoul','Silt Ghoul',2,6,'1d4+1',135,'skeleton','Its tongue tastes the air for anything warmer than mud.',{undead:2,power:'paralysis'});
E.beast('bell-wight','The Bell Wight',3,5,'1d6+1',380,'skeleton','A soaked bellkeeper carrying the weight of an unburied town.',{undead:3,power:'drain',morale:12});
E.beast('copper-moth','Copper Moth',2,6,'1d6',145,'moth','Wing scales flake off in little copper-green coins.',{power:'poison'});
E.beast('vellum-mimic','The Unwritten Index',4,4,'2d4',640,'slime','A catalogue of shifting tongues, loose leaves and missing names.',{power:'regenerate',morale:12});
E.beast('ash-hound','Ash Hound',3,5,'1d8',210,'rat','It leaves no prints, just black rings where its paws touched earth.',{power:'breath'});
E.beast('barrow-knight','Barrow Knight',4,3,'1d8+1',340,'skeleton','An empty helm turns toward you before the rest of the armour follows.',{undead:3,resist:1});
E.beast('iron-king','The Iron King',6,1,'2d6+1',1200,'skeleton','The jagged halves of a sword are rusted to the king’s gauntlets.',{undead:4,power:'drain',morale:12,resist:1});
E.beast('bog-serpent','Bog Serpent',5,4,'2d4+1',450,'serpent','Long pond weeds trail from the scarred hinges of its jaws.',{power:'poison',ambush:true});
E.beast('witch-queen','The Witch-Queen',8,0,'2d8',2400,'moth','Behind each of her borrowed faces another is already taking shape.',{power:'breath',morale:12,resist:1});
const beastFamilies=[
['Rat','rat','Gnaws a path through storehouses and anything trapped inside.'],['Burrower','rat','Its shovel claws throw out sprays of earth.'],['Hound','rat','It keeps pace without ever seeming to pant.'],['Wolf','rat','A rangy hunter that follows tracks by scent.'],['Boar','rat','Broken spearheads protrude from its wiry mane.'],['Bear','rat','A broad paw flattens bracken and stone alike.'],['Scuttler','rat','Half of its many eyes watch the walls behind you.','poison'],['Cave Bat','moth','It hunts where sound travels better than sight.','paralysis'],['Moth','moth','Its powder clings like old ash.','poison'],['Harrier','moth','A patient wheeling shape on the wind.'],['Carrion Kite','moth','The hooked bill can lift a shield from a hand.'],['Drake','moth','Smoke drifts between the teeth in its lower jaw.','breath'],['Basilisk','serpent','Its rigid throat quivers just before it strikes.','paralysis'],['Adder','serpent','The scales in its hood are pocked with old bites.','poison'],['Hydra','serpent','New jaws swell above every scar.','regenerate'],['Wyrm','serpent','Each breath first draws the warmth from the room.','breath'],['Reedling','goblin','Fingers woven with rushes pull at your boots.'],['Skulk','goblin','Coins tied under its collar barely make a sound.'],['Raider','goblin','The notches on its blade are recent.'],['Troll','goblin','Cuts fold back together like damp clay.','regenerate'],['Ogre','goblin','It swings tools never meant to be held in one hand.'],['Giant','goblin','It carefully tests each lintel with the back of its hand.'],['Golem','goblin','Hammer marks line the joints of this animated bulk.','resist'],['Revenant','skeleton','The dead thing walks a road only it can see.','drain',3],['Specter','skeleton','You can read old letters through its ribs.','drain',4],['Husk','skeleton','Its straps still smell of tanning oil.','paralysis',2],['Bone Guard','skeleton','It has not changed its post since the wall fell.',null,1],['Mire','slime','Its scattered drops inch back toward the largest pool.','regenerate'],['Gel','slime','Broken buckles hang suspended in its cloudy body.','paralysis'],['Ooze','slime','It flows around anything it cannot dissolve.','poison'],['Vine','serpent','The leaves twist to follow a vein of heat.','paralysis'],['Sporecap','slime','A wet cap exhales a dust that leaves a bitter taste.','poison']];
beastFamilies.push(
['Lantern Leech','serpent','A rubbery mouth unfurls from the underside of a pale disk.','drain'],
['Doom Bell','slime','This floating bell swallows nearby sounds before it rings.','shock'],
['Shale Tortoise','rat','Old layers of slate come loose from its shell as it walks.','resist'],
['Murmuration','moth','Hundreds of thumb-sized wings bank as a single animal.','swarm'],
['Rust Grub','serpent','An orange tassel brushes each piece of metal within reach.','acid'],
['Glass Crab','rat','You see the shadow of its claws before you see the claws themselves.','resist'],
['Hearth Devil','goblin','Hot soot pours from the broken clay jar it wears as a mask.','breath'],
['Dream Collector','moth','Its four wings are painted with skies from different seasons.','daze'],
['Mud Doll','goblin','It repeats the last three steps of anyone it meets.','regenerate'],
['Ribbon Eel','serpent','Black feathers stand along its back when the air turns dry.','shock'],
['Crypt Spider','rat','Wax flowers are caught in the silk behind its jaws.','poison'],
['Blind Arbalist','goblin','It goes still to listen before it touches the trigger.',null,null,6],
['Jade Eyeling','slime','A single lidless eye turns in a drifting ball of clear gel.','gaze',null,5],
['Pallbearer','skeleton','One long arm supports a coffin threaded with wire.','drain',2],
['Petrified Saint','skeleton','A stone finger reaches for the space above your shoulder.','gaze',3],
['Spear Beetle','rat','Two splintered horns jut beyond its wedge-shaped head.','charge'],
['Widow of the Door','moth','The blue cloth on its wings was taken from a bridal veil.','daze',2],
['Cauldron Jack','goblin','On its back, a cracked pot boils without a fire.','acid'],
['Woolbeak','moth','A bird’s head emerges from a coat of tangled wool.','charge'],
['Bellroot','serpent','The jointed stem rings when its white petals close.','paralysis'],
['Stairwalker','goblin','A spine of brass hinges lets it climb on all fours.','charge'],
['Hinge Hand','skeleton','Detached knuckles march along a series of little hinged bones.','paralysis',1],
['Tide Husk','skeleton','A little water runs from its sockets every time it nods.',null,2],
['Knob Lynx','rat','On dark roads its yellow eyes seem to hang out of reach.','charge'],
['Ironjaw Stag','rat','Its antlers snap shut like a gate when it lowers its head.','charge'],
['Whistle Jackal','rat','A rising whistle signals the beginning of its hunt.','swarm'],
['Knotted Lichen','slime','Any loosened knot sprouts two pale new threads.','regenerate'],
['Sour Breath','goblin','Its jug-shaped belly froths whenever it opens its mouth.','acid'],
['Oathbreaker','skeleton','Half a broken banner is tied to its sword hand.','drain',4],
['Soot Imp','moth','It uses a smouldering feather to light the way to its nest.','breath'],
['Echo Fisher','serpent','It draws creatures to deep water by copying their footfalls.','daze'],
['Copper Mare','rat','Sparks run along its mane when it paws at the road.','shock']);
const beastHues=['Gutter','Wicker','Ironwood','Stormglass','Embercrown'];
E.bands=Array.from({length:5},()=>[]);
beastFamilies.forEach(([name,skin,desc,power,undead,range],f)=>beastHues.forEach((prefix,i)=>{const hd=Math.max(.5,Math.floor((i*2+1)*(1.1+(f%7)*.21))),id=E.slug(prefix+' '+name);E.beast(id,prefix+' '+name,hd,Math.max(-5,8-i*2-Math.floor(f%6/2)),hd<3?'1d4':hd<7?'1d8+1':hd<13?'2d6+2':'3d6+4',Math.floor(22*hd*hd+17*hd),skin,desc,{power:power==='resist'?null:power,undead,resist:power==='resist'||i>=4?Math.min(3,1+Math.floor(i/2)):undefined,ambush:(f+i)%9===0,hue:i,range:range||([8,10,11,18].includes(f)?4:1)});E.bands[i].push(id);}));
