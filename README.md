# Custom page for Domoticz

pour faire suite à cet <a href=http://easydomoticz.com/les-custom-pages-domoticz/>article</a> ou cet <a href=http://easydomoticz.com/mon-domoticz-a-moi-les-frontages-interactives-la-configuration/>article</a>
pour ceux qui comme moi trouvent dommage d'avoir un panneau de contrôle sans interaction possible, je vous propose ma version interactive,
qui n'est autre qu'un condensé de l'excellent travail de toute une <a href=http://www.domoticz.com/forum/viewtopic.php?f=8&t=4698>communauté</a>

voici ce que j'obtiens sur une tablette 7" (un slide est possible une autres page)
<img src="https://drive.google.com/uc?id=0BxlxVZPVHBfPeFRsVmpENmdrNGc"/>

# Installation

<pre>
sudo apt-get install git
git clone https://github.com/vil1driver/monitor.git /home/pi/domoticz/www/monitor
</pre>
vous pouvez également récupérer l'arborescence au format zip <a href=https://github.com/vil1driver/monitor/archive/master.zip>ici</a> 

# Configuration

Editez le fichier <pre>/home/pi/domoticz/www/monitor/js/<b>frontpage_settings.js</b></pre>
Pour cela, je vous recommande les logiciels suivant:<br>
<a href=http://www.clubic.com/telecharger-fiche11156-winscp.html>WinSCP</a> (explorateur de fichier utilisant la connexion SSH, permettant transferts, éditions, suppressions..)<br>
<a href=http://www.clubic.com/telecharger-fiche9567-notepad.html>NotePad++</a> comme éditeur (à préciser dans les option de WinSCP)

renseignez l'url de votre domoticz
<pre>$.domoticzurl="http://USER:PASS@IP:PORT";</pre>
puis les idx de vos devices, l'info à glaner (value), le nom de la cellule dans laquelle les placer, la légende, etc... 
exemple avec l'heure en haut à gauche (cellule 1)
<pre>
['0','Clock','cell1','','','','font-family:digital;color:#8BFD1C;font-size:160%'],</pre>

Cette commande donne la liste des values potentiellement utilisables, d'un device (remplacez IDX par l'idx de votre device)
<pre>
/json.htm?type=devices&rid=IDX
</pre>

# Utilisation

vous aurez sans doute remarqué la présence des fichiers nommés frontpage.html et frontpage3.html<br>
ce dernier offre une page supplémentaire (soit 3 pages) par rapport au fichier frontpage.html (qui n'en compte que 2)

à votre convenance (si vous souhaitez avoir 3 pages),<br>
renommez <b>frontpage.html</b> en <b>frontpage2.html</b> et <b>frontpage3.html</b> en <b>frontpage.html</b>
<pre>
cd /home/pi/domoticz/www/monitor/
mv frontpage.html frontpage2.html && mv frontpage3.html frontpage.html
</pre>
puis afficher votre nouvelle interface via <br>
<a href="#">http://user:pass@ip:port/monitor/frontpage.html</a><br>
ou<br>
<a href="#">http://ip:port/monitor/frontpage.html</a><br>

# Mise à jour

<pre>
cd /home/pi/domoticz/www/monitor/
cp js/frontpage_settings.js js/frontpage_settings_old.js
git pull
</pre>
puis éditez de nouveau le fichier <b>frontpage_settings.js</b> pour y configurer les nouveaux paramètres qui peuvent y avoir été ajouté
et rapatrier votre configuration sauvée dans <b>frontpage_settings_old.js</b>

<pre>
##########################################################
#### vvvvv   USER VALUES below vvvvv   #######
##########################################################

			Lors d'une mise à jour,
		ne conserver que ce qui se trouve ici.

##########################################################
#### ^^^^^   USER VALUES above ^^^^^   #######
##########################################################
</pre>
