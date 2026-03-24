import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

@Component({
  selector: 'app-components-preview',
  templateUrl: './components-preview.page.html',
  styleUrls: ['./components-preview.page.scss'],
  standalone: false
})
export class ComponentsPreviewPage implements OnInit {
  selectedCategory: string = 'all';
  searchQuery: string = '';
  selectedComponent: any = null;

  categories = [
    { id: 'all', title: 'Tous' },
    { id: 'action', title: 'Actions' },
    { id: 'form', title: 'Formulaires' },
    { id: 'layout', title: 'Layout' },
    { id: 'data', title: 'Données' },
    { id: 'nav', title: 'Navigation' }
  ];

  allComponents = [
    // Actions
    { title: 'Action Sheet', id: 'action-sheet', icon: 'list-circle-outline', category: 'action', desc: 'Menu d\'actions sortant du bas' },
    { title: 'Alert', id: 'alert', icon: 'alert-circle-outline', category: 'action', desc: 'Boîte de dialogue native' },
    { title: 'Button', id: 'button', icon: 'square-outline', category: 'action', desc: 'Boutons interactifs' },
    { title: 'FAB', id: 'fab', icon: 'add-circle-outline', category: 'action', desc: 'Bouton d\'action flottant' },
    { title: 'Toast', id: 'toast', icon: 'chatbubble-outline', category: 'action', desc: 'Notification éphémère' },
    
    // Forms
    { title: 'Checkbox', id: 'checkbox', icon: 'checkbox-outline', category: 'form', desc: 'Cases à cocher' },
    { title: 'Datetime', id: 'datetime', icon: 'calendar-outline', category: 'form', desc: 'Sélecteur de date et heure' },
    { title: 'Input', id: 'input', icon: 'text-outline', category: 'form', desc: 'Champs de texte' },
    { title: 'Radio', id: 'radio', icon: 'radio-button-on-outline', category: 'form', desc: 'Boutons radio' },
    { title: 'Range', id: 'range', icon: 'options-outline', category: 'form', desc: 'Curseur de sélection' },
    { title: 'Searchbar', id: 'searchbar', icon: 'search-outline', category: 'form', desc: 'Barre de recherche' },
    { title: 'Select', id: 'select', icon: 'chevron-down-circle-outline', category: 'form', desc: 'Menu déroulant' },
    { title: 'Toggle', id: 'toggle', icon: 'toggle-outline', category: 'form', desc: 'Bouton bascule' },
    { title: 'Textarea', id: 'textarea', icon: 'document-text-outline', category: 'form', desc: 'Zone de texte multi-lignes' },

    // Layout / Structure
    { title: 'Accordion', id: 'accordion', icon: 'menu-outline', category: 'layout', desc: 'Panneaux repliables' },
    { title: 'Card', id: 'card', icon: 'card-outline', category: 'layout', desc: 'Conteneurs stylisés' },
    { title: 'Grid', id: 'grid', icon: 'grid-outline', category: 'layout', desc: 'Système de grille responsive' },
    { title: 'Header/Footer', id: 'header', icon: 'arrow-up-circle-outline', category: 'layout', desc: 'En-têtes et pieds de page' },
    { title: 'Item', id: 'item', icon: 'reorder-two-outline', category: 'layout', desc: 'Lignes de liste' },
    { title: 'Item Divider', id: 'divider', icon: 'remove-outline', category: 'layout', desc: 'Séparateurs de liste' },
    { title: 'Item Group', id: 'item-group', icon: 'albums-outline', category: 'layout', desc: 'Groupes d\'items' },
    { title: 'Item Sliding', id: 'item-sliding', icon: 'swap-horizontal-outline', category: 'layout', desc: 'Éléments glissants' },

    // Data / Display
    { title: 'Avatar', id: 'avatar', icon: 'person-circle-outline', category: 'data', desc: 'Images circulaires' },
    { title: 'Badge', id: 'badge', icon: 'pricetag-outline', category: 'data', desc: 'Indicateurs chiffrés' },
    { title: 'Chip', id: 'chip', icon: 'ellipse-outline', category: 'data', desc: 'Étiquettes compactes' },
    { title: 'Icon', id: 'icon', icon: 'star-outline', category: 'data', desc: 'Icônes vectorielles' },
    { title: 'List', id: 'list', icon: 'list-outline', category: 'data', desc: 'Listes de données' },
    { title: 'Note', id: 'note', icon: 'information-circle-outline', category: 'data', desc: 'Texte d\'information' },
    { title: 'Progress Bar', id: 'progress', icon: 'remove-outline', category: 'data', desc: 'Barre de progression linéaire' },
    { title: 'Skeleton Text', id: 'skeleton', icon: 'flash-outline', category: 'data', desc: 'Indicateur de chargement UI' },
    { title: 'Spinner', id: 'spinner', icon: 'sync-outline', category: 'data', desc: 'Indicateur de chargement circulaire' },
    { title: 'Text', id: 'text', icon: 'text-outline', category: 'data', desc: 'Typographie' },
    { title: 'Thumbnail', id: 'thumbnail', icon: 'image-outline', category: 'data', desc: 'Images carrées' },
    
    // Navigation / Utilities
    { title: 'Breadcrumbs', id: 'breadcrumbs', icon: 'chevron-forward-outline', category: 'nav', desc: 'Fil d\'Ariane' },
    { title: 'Menu', id: 'menu', icon: 'menu-outline', category: 'nav', desc: 'Menu latéral' },
    { title: 'Modal', id: 'modal', icon: 'albums-outline', category: 'nav', desc: 'Fenêtre modale' },
    { title: 'Popover', id: 'popover', icon: 'chatbubbles-outline', category: 'nav', desc: 'Menu contextuel' },
    { title: 'Refresher', id: 'refresher', icon: 'refresh-outline', category: 'nav', desc: 'Tirer pour rafraîchir' },
    { title: 'Segment', id: 'segment', icon: 'albums-outline', category: 'nav', desc: 'Onglets segmentés' },
    { title: 'Tabs', id: 'tabs', icon: 'folder-outline', category: 'nav', desc: 'Barre d\'onglets' },
  ];

  filteredComponents = [...this.allComponents];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController
  ) {
    // Enregistrement dynamique de toutes les icônes ionicons
    addIcons(allIcons);
  }

  ngOnInit() {
  }

  filterCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.applyFilters();
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredComponents = this.allComponents.filter(c => {
      const matchCat = this.selectedCategory === 'all' || c.category === this.selectedCategory;
      const matchSearch = c.title.toLowerCase().includes(this.searchQuery) || c.desc.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });
  }

  showComponent(comp: any) {
    this.selectedComponent = comp;
    setTimeout(() => {
      const el = document.getElementById('preview-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  closePreview() {
    this.selectedComponent = null;
  }

  // --- DEMOS ACTIONS ---

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        { text: 'Supprimer', role: 'destructive', icon: 'trash' },
        { text: 'Partager', icon: 'share' },
        { text: 'Jouer', icon: 'caret-forward-circle' },
        { text: 'Annuler', role: 'cancel', icon: 'close' }
      ]
    });
    await actionSheet.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerte Système',
      subHeader: 'Attention requise',
      message: 'Ceci est une superbe alerte Ionic.',
      buttons: ['Compris']
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Fichier sauvegardé avec succès.',
      duration: 2000,
      color: 'success',
      icon: 'checkmark-circle'
    });
    toast.present();
  }

}
