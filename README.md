# Custom page for Domoticz

pour faire suite à cet <a href=http://easydomoticz.com/les-custom-pages-domoticz/>article</a> ou cet <a href=http://easydomoticz.com/mon-domoticz-a-moi-les-frontages-interactives-la-configuration/>article</a>
pour ceux qui comme moi trouvent dommage d'avoir un panneau de contrôle sans interaction possible, je vous propose ma version interactive,
qui n'est autre qu'un condensé de l'excellent travail de toute une <a href=http://www.domoticz.com/forum/viewtopic.php?f=8&t=4698>communauté</a>

voici ce que j'obtiens sur une tablette 7" (un slide est possible une autres page)
<img src="https://drive.google.com/uc?id=0BxlxVZPVHBfPeFRsVmpENmdrNGc"/>

# Installation

<code>
sudo apt-get install git
git clone https://github.com/vil1driver/monitor.git /home/pi/domoticz/www/monitor
</code>
vous pouvez également récupérer l'arborescence au format zip <a href=https://github.com/vil1driver/monitor/archive/master.zip>ici</a> 

# Configuration

Editez le fichier <color=#4040BF>/home/pi/domoticz/www/monitor/js/[/color][color=#FF40FF]frontpage_settings.js</color> 
Pour cela, je vous recommande les logiciels suivant:
<a href=http://www.clubic.com/telecharger-fiche11156-winscp.html>WinSCP</a> (explorateur de fichier utilisant la connexion SSH, permettant transferts, éditions, suppressions..) 
<a href=http://www.clubic.com/telecharger-fiche9567-notepad.html>NotePad++</a> comme éditeur (à préciser dans les option de WinSCP)

renseignez l'url de votre domoticz
<code>$.domoticzurl="http://USER:PASS@IP:PORT";</code>
puis les idx de vos devices, l'info à glaner (value), le nom de la cellule dans laquelle les placer, la légende, etc... 
exemple avec l'heure en haut à gauche (cellule 1)
<code>
['0','Clock','cell1','','','','font-family:digital;color:#8BFD1C;font-size:160%'],	// heure et date
</code>

Cette commande donne la liste des values potentiellement utilisables, d'un device (remplacez IDX par l'idx de votre device)
<code>
/json.htm?type=devices&rid=IDX
</code>

# Utilisation

vous aurez sans doute remarqué la présence des fichiers nommés frontpage.html et frontpage3.html
ce dernier offre une page supplémentaire (soit 3 pages) par rapport au fichier frontpage.html (qui n'en compte que 2)

à votre convenance (si vous souhaitez avoir 3 pages), renommez frontpage.html en frontpage2.html et frontpage3.html en frontpage.html
<code>
cd /home/pi/domoticz/www/monitor/
mv frontpage.html frontpage2.html && mv frontpage3.html frontpage.html
</code>
puis afficher votre nouvelle interface via 
http://user:pass@ip:port/monitor/frontpage.html
ou
http://ip:port/monitor/frontpage.html

# Mise à jour

<code>
cd /home/pi/domoticz/www/monitor/
cp js/frontpage_settings.js js/frontpage_settings_old.js
git pull
</code>
puis éditez de nouveau le fichier frontpage_settings.js pour y configurer les nouveaux paramètres qui peuvent y avoir été ajouté
et rapatrier votre configuration sauvée dans frontpage_settings_old.js

<code>
// ############################################################################################################
// #### vvvvv   USER VALUES below vvvvv   #######
// ############################################################################################################

			Lors d'une mise à jour,
		ne conserver que ce qui se trouve ici.

// ############################################################################################################
// #### ^^^^^   USER VALUES above ^^^^^   #######
// ############################################################################################################
</code>
