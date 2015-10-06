# Custom page for Domoticz

<img src="https://drive.google.com/uc?id=0BxlxVZPVHBfPeFRsVmpENmdrNGc"/>

# Installation

<pre>
sudo apt-get install git
git clone https://github.com/vil1driver/monitor.git /home/pi/domoticz/www/monitor
</pre>

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

Cette commande donne la liste des values potentiellement utilisables, d'un device<br>
remplacez IDX par l'idx de votre device
<pre>
/json.htm?type=devices&rid=IDX
</pre>

# Utilisation


puis afficher votre nouvelle interface via <br>
<a href="#">http://ip:port/monitor/</a><br>

# Mise à jour

<pre>
cd /home/pi/domoticz/www/monitor/
mv js/frontpage_settings.js js/frontpage_settings_old.js
git pull
</pre>
puis éditez de nouveau le fichier <b>frontpage_settings.js</b><br>
pour y configurer les nouveaux paramètres qui peuvent y avoir été ajouté<br>
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
