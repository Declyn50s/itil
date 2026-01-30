import type { Lang, ModuleId } from '../types'

export type SummaryBlock =
  | { type: 'definition'; label: string; text: string }
  | { type: 'callout'; tone: 'info' | 'note' | 'success' | 'danger'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'twoCols'; leftTitle: string; leftText: string; rightTitle: string; rightText: string }

export type ModuleSummary = {
  objective: string
  sections: { title: string; blocks: SummaryBlock[] }[]
  takeaways: string[]
}

const FR: Record<ModuleId, ModuleSummary | undefined> = {
  M2: {
    objective:
      "Comprendre comment la valeur est créée grâce aux services, et le rôle des organisations, des clients, des fournisseurs et des relations de service. Ce module pose les bases fondamentales d’ITIL 4.",
    sections: [
      {
        title: '1. Qu’est-ce que la gestion des services ?',
        blocks: [
          {
            type: 'definition',
            label: 'Définition (à connaître par cœur)',
            text: 'La gestion des services est un ensemble de capacités organisationnelles spécialisées permettant de créer de la valeur pour les clients sous forme de services.',
          },
          { type: 'callout', tone: 'info', text: 'Objectif principal : créer de la valeur, pas juste fournir un service.' },
        ],
      },
      {
        title: '2. La notion de valeur (concept central)',
        blocks: [
          {
            type: 'list',
            items: [
              'La valeur correspond à l’utilité perçue, aux bénéfices obtenus et à l’importance pour le client.',
              'La valeur est subjective : elle dépend du point de vue du client.',
            ],
          },
        ],
      },
      {
        title: '3. Co-création de valeur',
        blocks: [
          {
            type: 'twoCols',
            leftTitle: 'Ancien modèle',
            leftText: 'Le fournisseur fournit, le client reçoit.',
            rightTitle: 'ITIL 4',
            rightText: 'La valeur est co-créée entre le fournisseur, le client et d’autres parties prenantes. Le client participe activement.',
          },
        ],
      },
      {
        title: '4. Parties prenantes (stakeholders)',
        blocks: [
          {
            type: 'table',
            headers: ['Rôle', 'Description'],
            rows: [
              ['Fournisseur de services', 'Fournit le service'],
              ['Consommateur de services', 'Utilise le service'],
              ['Client', 'Définit les besoins'],
              ['Utilisateur', 'Utilise le service'],
              ['Sponsor', 'Finance le service'],
              ['Autres parties prenantes', 'Partenaires, régulateurs, actionnaires…'],
            ],
          },
          { type: 'callout', tone: 'note', text: 'Une même organisation peut être client et fournisseur en même temps.' },
        ],
      },
      {
        title: '5. Produits, services et ressources',
        blocks: [
          {
            type: 'list',
            items: [
              'Service : moyen de créer de la valeur sans que le client gère les coûts et risques.',
              'Produit : ensemble de ressources configurées pour fournir un service.',
              'Ressources : personnes, technologies, informations, processus, partenaires.',
            ],
          },
        ],
      },
      {
        title: '6. Offres de service',
        blocks: [
          {
            type: 'table',
            headers: ['Élément', 'Description'],
            rows: [
              ['Biens', 'Ex : matériel, équipements'],
              ['Accès aux ressources', 'Ex : logiciels, réseaux'],
              ['Activités de service', 'Support, maintenance'],
            ],
          },
          { type: 'callout', tone: 'info', text: 'Une même organisation peut proposer plusieurs offres à partir d’un même produit.' },
        ],
      },
      {
        title: '7. Relations de service',
        blocks: [
          {
            type: 'list',
            items: [
              'Une relation de service inclut la fourniture du service (gestion des ressources, exécution, amélioration continue).',
              'Elle inclut aussi la consommation du service (utilisation, demandes, exploitation).',
              'La relation est bidirectionnelle.',
            ],
          },
        ],
      },
      {
        title: '8. Résultats, livrables, coûts et risques',
        blocks: [
          {
            type: 'twoCols',
            leftTitle: 'Résultats (Outcomes)',
            leftText: 'Ce que le client veut atteindre.',
            rightTitle: 'Livrables (Outputs)',
            rightText: 'Ce que le service produit. Un livrable ≠ un résultat.',
          },
          {
            type: 'list',
            items: [
              'Coûts : coûts imposés au client + coûts supprimés grâce au service.',
              'Risques : risques pris en charge par le fournisseur + risques restants pour le client.',
              'Un bon service réduit les risques pour le client.',
            ],
          },
        ],
      },
      {
        title: '9. Utilité & Garantie (très important à l’examen)',
        blocks: [
          {
            type: 'twoCols',
            leftTitle: 'Utilité',
            leftText: 'Ce que fait le service. “Est-ce que le service répond au besoin ?”',
            rightTitle: 'Garantie',
            rightText: 'Comment le service fonctionne : disponibilité, capacité, continuité, sécurité.',
          },
          { type: 'callout', tone: 'success', text: 'Pour créer de la valeur : Utilité + Garantie sont obligatoires.' },
        ],
      },
    ],
    takeaways: [
      'La valeur est co-créée : le client participe.',
      'Service ≠ produit.',
      'Utilité + Garantie = valeur.',
      'Client ≠ utilisateur ≠ sponsor.',
      'Un service réduit les coûts et les risques.',
    ],
  },

  M3: {
    objective:
      'Comprendre les principes universels qui guident les décisions, les actions, l’amélioration continue et la gestion des services. Ces principes servent de boussole dans toutes les situations.',
    sections: [
      {
        title: '1. Que sont les principes directeurs ?',
        blocks: [
          {
            type: 'definition',
            label: 'Définition',
            text: 'Des recommandations universelles qui guident les organisations dans toutes les situations. Elles sont applicables à tout type d’organisation, utilisables en permanence, et inspirées de bonnes pratiques (Lean, Agile, DevOps…).',
          },
        ],
      },
      {
        title: '2. Les 7 principes directeurs ITIL 4',
        blocks: [
          {
            type: 'table',
            headers: ['Principe', 'Idée clé'],
            rows: [
              ['1) Se concentrer sur la valeur', 'Tout doit créer de la valeur pour le client.'],
              ['2) Commencer là où vous êtes', 'Ne pas repartir de zéro : analyser et réutiliser l’existant.'],
              ['3) Progresser par itérations avec feedback', 'Avancer petit à petit et corriger grâce au feedback.'],
              ['4) Collaborer et promouvoir la visibilité', 'Travailler ensemble et rendre le travail visible.'],
              ['5) Penser et travailler de manière holistique', 'Considérer le système global, pas une partie isolée.'],
              ['6) Rester simple et pratique', 'Éviter la complexité inutile, garder ce qui apporte de la valeur.'],
              ['7) Optimiser et automatiser', 'Optimiser d’abord, automatiser ensuite (ne pas automatiser un mauvais process).'],
            ],
          },
          { type: 'callout', tone: 'info', text: 'Point d’examen classique : la priorité principale d’une organisation est de créer de la valeur.' },
        ],
      },
      {
        title: '3. Application des principes',
        blocks: [
          {
            type: 'list',
            items: [
              'Ils s’appliquent à tous les niveaux, dans tous les projets, et dans toutes les pratiques ITIL.',
              'Ils servent à prendre des décisions, améliorer les services et guider le changement.',
            ],
          },
        ],
      },
      {
        title: '4. Lien avec les autres modules',
        blocks: [
          {
            type: 'table',
            headers: ['Module', 'Lien'],
            rows: [
              ['Module 2', 'Création de valeur'],
              ['Module 3', 'Manière de penser (principes directeurs)'],
              ['Module 4', 'Vue globale'],
              ['Module 5', 'Chaîne de valeur'],
              ['Module 6', 'Amélioration continue'],
              ['Module 7', 'Application concrète'],
            ],
          },
        ],
      },
      {
        title: '5. Mémo (ultra rapide)',
        blocks: [
          {
            type: 'list',
            items: [
              '1) Focus sur la valeur',
              '2) Partir de l’existant',
              '3) Avancer par étapes',
              '4) Collaborer',
              '5) Penser global',
              '6) Faire simple',
              '7) Optimiser avant d’automatiser',
            ],
          },
        ],
      },
    ],
    takeaways: [
      'Il y a 7 principes directeurs.',
      'Ils sont universels et utilisables en permanence.',
      'Ils guident décisions, amélioration continue et gestion des services.',
      'Ils favorisent valeur, simplicité, collaboration et amélioration.',
    ],
  },

  // ✅ AJOUT : MODULE 4 (FR)
  M4: {
    objective:
      'Comprendre les 4 dimensions indispensables à une gestion efficace des services. Une organisation performante doit équilibrer ces 4 dimensions en permanence.',
    sections: [
      {
        title: '1. Les 4 dimensions ITIL (vue d’ensemble)',
        blocks: [
          {
            type: 'list',
            items: [
              '1) Organisation & Personnes',
              '2) Information & Technologie',
              '3) Partenaires & Fournisseurs',
              '4) Flux de valeur & Processus',
            ],
          },
          { type: 'callout', tone: 'danger', text: 'Si une seule dimension est négligée → le service est déséquilibré.' },
        ],
      },
      {
        title: '2. Organisation & Personnes',
        blocks: [
          {
            type: 'list',
            items: [
              'Objectif : s’assurer que les bonnes personnes ont les bonnes compétences, comprennent leur rôle et collaborent efficacement.',
              'Inclut : culture d’entreprise, rôles & responsabilités, compétences, communication, leadership.',
            ],
          },
          { type: 'callout', tone: 'note', text: 'Une bonne technologie ne suffit pas : les humains sont au cœur du service.' },
        ],
      },
      {
        title: '3. Information & Technologie',
        blocks: [
          {
            type: 'list',
            items: [
              'Objectif : disposer des bonnes données, des bons outils et des bonnes technologies.',
              'Inclut : systèmes informatiques, bases de données, sécurité, information, automatisation.',
            ],
          },
          {
            type: 'table',
            headers: ['Questions à se poser'],
            rows: [
              ['Les données sont-elles fiables ?'],
              ['Les outils sont-ils adaptés ?'],
              ['La sécurité est-elle suffisante ?'],
              ['L’information est-elle accessible ?'],
            ],
          },
        ],
      },
      {
        title: '4. Partenaires & Fournisseurs',
        blocks: [
          {
            type: 'list',
            items: [
              'Objectif : gérer les relations avec les tiers qui participent au service.',
              'Inclut : fournisseurs IT, sous-traitants, partenaires, contrats, SLA (accords de niveau de service).',
            ],
          },
          {
            type: 'callout',
            tone: 'info',
            text: 'Externalisation ≠ perte de contrôle : collaboration + maîtrise des risques.',
          },
        ],
      },
      {
        title: '5. Flux de valeur & Processus',
        blocks: [
          {
            type: 'list',
            items: [
              'Objectif : comprendre comment la valeur est créée de bout en bout.',
              'Inclut : processus, activités, workflows, automatisations, chaînes de valeur.',
            ],
          },
          { type: 'callout', tone: 'success', text: 'Principe clé : se concentrer sur la valeur produite, pas uniquement sur les tâches.' },
        ],
      },
      {
        title: '6. Lien avec le SVS (Système de Valeur des Services)',
        blocks: [
          {
            type: 'list',
            items: [
              'Les 4 dimensions soutiennent le SVS.',
              'Elles influencent la chaîne de valeur.',
              'Elles garantissent une vision globale et évitent les décisions en silo.',
            ],
          },
        ],
      },
      {
        title: '7. Mémo (ultra synthèse)',
        blocks: [
          {
            type: 'table',
            headers: ['Dimension', 'Rôle'],
            rows: [
              ['Organisation & Personnes', 'Compétences, culture, rôles'],
              ['Information & Technologie', 'Outils, données, sécurité'],
              ['Partenaires & Fournisseurs', 'Relations externes'],
              ['Flux de valeur & Processus', 'Création de valeur'],
            ],
          },
          { type: 'callout', tone: 'info', text: 'Question type examen : elles garantissent une approche équilibrée et globale de la gestion des services.' },
        ],
      },
    ],
    takeaways: [
      'Il y a 4 dimensions ITIL.',
      'Elles doivent toutes être prises en compte : aucune ne doit être négligée.',
      'Elles s’appliquent à tous les services.',
      'Elles soutiennent la création de valeur et évitent la vision en silo.',
    ],
  },

  // 🚧 SQUELETTES À COMPLÉTER
    M5: {
    objective:
      'Comprendre comment une organisation transforme une demande en valeur grâce au Système de Valeur des Services (SVS), en combinant principes, gouvernance, chaîne de valeur, pratiques et amélioration continue.',
    sections: [
      {
        title: '1. Le Système de Valeur des Services (SVS)',
        blocks: [
          {
            type: 'definition',
            label: 'Définition',
            text: 'Le SVS décrit comment tous les composants d’une organisation travaillent ensemble pour créer de la valeur à travers des services.',
          },
          {
            type: 'list',
            items: [
              'Il relie les opportunités aux résultats.',
              'Il transforme la demande en valeur.',
              'Il assure une vision globale et cohérente.',
            ],
          },
        ],
      },
      {
        title: '2. Les composants du SVS',
        blocks: [
          {
            type: 'table',
            headers: ['Composant', 'Rôle'],
            rows: [
              ['Principes directeurs', 'Guident les décisions et les actions'],
              ['Gouvernance', 'Oriente et contrôle l’organisation'],
              ['Chaîne de valeur', 'Transforme la demande en valeur'],
              ['Pratiques', 'Exécutent les activités'],
              ['Amélioration continue', 'Optimise en permanence'],
            ],
          },
        ],
      },
      {
        title: '3. Principes directeurs',
        blocks: [
          {
            type: 'list',
            items: [
              'Déjà vus dans le module 3.',
              'Servent de guide permanent pour les décisions.',
              'Aident à prioriser et améliorer les services.',
            ],
          },
        ],
      },
      {
        title: '4. Gouvernance',
        blocks: [
          {
            type: 'list',
            items: [
              'Garantit que l’organisation est bien dirigée.',
              'S’assure du respect des règles et des objectifs.',
              'Permet de diriger, contrôler et évaluer.',
            ],
          },
          {
            type: 'callout',
            tone: 'info',
            text: 'La gouvernance est généralement assurée par la direction.',
          },
        ],
      },
      {
        title: '5. Chaîne de valeur des services',
        blocks: [
          {
            type: 'table',
            headers: ['Activité', 'Rôle'],
            rows: [
              ['Planifier', 'Définir la vision et la stratégie'],
              ['Améliorer', 'Assurer l’amélioration continue'],
              ['Engager', 'Interaction avec les clients'],
              ['Concevoir & Transiter', 'Créer ou modifier les services'],
              ['Obtenir / Construire', 'Développer ou acquérir'],
              ['Fournir & Supporter', 'Livrer et maintenir le service'],
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            text: 'Toutes les activités peuvent être utilisées selon le besoin.',
          },
        ],
      },
      {
        title: '6. Pratiques ITIL',
        blocks: [
          {
            type: 'list',
            items: [
              'Remplacent les processus ITIL v3.',
              'Soutiennent la chaîne de valeur.',
              'Exemples : gestion des incidents, changements, niveaux de service, centre de services.',
            ],
          },
        ],
      },
      {
        title: '7. Amélioration continue',
        blocks: [
          {
            type: 'list',
            items: [
              'Objectif : améliorer services, pratiques, produits et organisation.',
              'Basée sur le modèle PDCA.',
            ],
          },
          {
            type: 'table',
            headers: ['Étape'],
            rows: [
              ['1. Où en sommes-nous ?'],
              ['2. Où voulons-nous aller ?'],
              ['3. Comment y arriver ?'],
              ['4. Agir'],
              ['5. Évaluer'],
              ['6. Maintenir l’amélioration'],
            ],
          },
        ],
      },
      {
        title: '8. Fonctionnement global du SVS',
        blocks: [
          {
            type: 'twoCols',
            leftTitle: 'Entrée',
            leftText: 'Demande / Opportunité',
            rightTitle: 'Sortie',
            rightText: 'Valeur créée',
          },
          {
            type: 'callout',
            tone: 'success',
            text: 'Le SVS garantit que chaque action contribue à la création de valeur.',
          },
        ],
      },
      {
        title: '9. Mémo examen',
        blocks: [
          {
            type: 'table',
            headers: ['Élément', 'Rôle'],
            rows: [
              ['Principes', 'Guident les décisions'],
              ['Gouvernance', 'Oriente et contrôle'],
              ['Chaîne de valeur', 'Crée la valeur'],
              ['Pratiques', 'Exécutent'],
              ['Amélioration continue', 'Optimise en permanence'],
            ],
          },
          {
            type: 'callout',
            tone: 'info',
            text: 'Question type examen : le SVS transforme la demande en valeur grâce à un système intégré.',
          },
        ],
      },
    ],
    takeaways: [
      'Le SVS est le cœur d’ITIL 4.',
      'Il relie tous les concepts ITIL.',
      'Il transforme une demande en valeur.',
      'Il repose sur 5 composants clés.',
      'Il garantit une amélioration continue.',
    ],
  },

    M6: {
    objective:
      "Comprendre comment améliorer en permanence les services, les processus, les pratiques et l’organisation dans son ensemble. L’amélioration continue est au cœur d’ITIL 4.",
    sections: [
      {
        title: "1. Qu’est-ce que l’amélioration continue ?",
        blocks: [
          {
            type: "definition",
            label: "Définition",
            text: "Activité permanente visant à améliorer les produits, services et pratiques à tous les niveaux de l’organisation.",
          },
          {
            type: "callout",
            tone: "note",
            text: "Elle ne concerne pas seulement l’IT : elle s’applique à toute l’organisation.",
          },
        ],
      },
      {
        title: "2. Le modèle d’amélioration continue (clé de l’examen)",
        blocks: [
          {
            type: "table",
            headers: ["Les 7 étapes officielles ITIL"],
            rows: [
              ["1) Où en sommes-nous ?"],
              ["2) Où voulons-nous aller ?"],
              ["3) Comment y arriver ?"],
              ["4) Agir"],
              ["5) Avons-nous atteint l’objectif ?"],
              ["6) Comment maintenir l’élan ?"],
              ["7) Recommencer (amélioration continue)"],
            ],
          },
          {
            type: "callout",
            tone: "info",
            text: "Ce cycle est permanent, pas ponctuel.",
          },
        ],
      },
      {
        title: "3. Explication simple des étapes",
        blocks: [
          {
            type: "table",
            headers: ["Étape", "À quoi ça sert"],
            rows: [
              ["1) Où en sommes-nous ?", "Analyser la situation actuelle, indicateurs, problèmes"],
              ["2) Où voulons-nous aller ?", "Définir des objectifs clairs, mesurables, résultats attendus"],
              ["3) Comment y arriver ?", "Construire un plan d’action : ressources, priorités"],
              ["4) Agir", "Mettre en œuvre : tests, changements"],
              ["5) Avons-nous atteint l’objectif ?", "Mesurer et comparer les résultats à la cible"],
              ["6) Comment maintenir l’élan ?", "Standardiser, documenter, communiquer"],
              ["7) Recommencer", "Relancer un nouveau cycle d’amélioration"],
            ],
          },
        ],
      },
      {
        title: "4. Lien avec PDCA",
        blocks: [
          {
            type: "table",
            headers: ["PDCA", "Correspondance ITIL (approx.)"],
            rows: [
              ["Plan", "Où en sommes-nous ? / Où voulons-nous aller ? / Comment y arriver ?"],
              ["Do", "Agir"],
              ["Check", "Avons-nous atteint l’objectif ?"],
              ["Act", "Maintenir l’élan / Recommencer"],
            ],
          },
        ],
      },
      {
        title: "5. Rôle des indicateurs (KPI)",
        blocks: [
          {
            type: "list",
            items: [
              "Mesurer la performance",
              "Suivre les progrès",
              "Justifier les décisions",
              "Piloter l’amélioration",
            ],
          },
          {
            type: "callout",
            tone: "danger",
            text: "Sans mesure → pas d’amélioration possible.",
          },
        ],
      },
      {
        title: "6. Lien avec les autres modules",
        blocks: [
          {
            type: "table",
            headers: ["Module", "Lien"],
            rows: [
              ["Module 3", "Utilise les principes directeurs"],
              ["Module 4", "S’applique aux 4 dimensions"],
              ["Module 5", "Partie intégrante du SVS"],
              ["Module 7", "S’applique aux pratiques"],
            ],
          },
        ],
      },
      {
        title: "7. Mémo examen",
        blocks: [
          {
            type: "list",
            items: [
              "Amélioration continue = amélioration permanente, pas ponctuelle",
              "Basée sur un cycle structuré en 7 étapes",
              "Doit être mesurable (KPI)",
              "S’applique à toute l’organisation",
              "Soutient la création de valeur",
            ],
          },
          {
            type: "callout",
            tone: "info",
            text: "Question type examen : améliorer services/pratiques/processus en continu pour créer de la valeur.",
          },
        ],
      },
    ],
    takeaways: [
      "L’amélioration est continue, pas ponctuelle.",
      "Elle concerne toute l’organisation.",
      "Elle repose sur un cycle officiel en 7 étapes.",
      "Elle doit être mesurable (KPI).",
      "Elle soutient directement la création de valeur.",
    ],
  },

    M7: {
    objective:
      "Comprendre ce que sont les pratiques ITIL, leur rôle dans la gestion des services et connaître les pratiques essentielles pour l’examen ITIL Foundation.",
    sections: [
      {
        title: "1. Qu’est-ce qu’une pratique ITIL ?",
        blocks: [
          {
            type: "definition",
            label: "Définition",
            text: "Une pratique est un ensemble de ressources organisationnelles conçu pour accomplir un objectif spécifique.",
          },
          {
            type: "list",
            items: [
              "Plus large qu’un processus",
              "Inclut personnes, outils, processus et informations",
              "Remplace les processus ITIL v3",
            ],
          },
        ],
      },
      {
        title: "2. Les 3 types de pratiques ITIL",
        blocks: [
          {
            type: "table",
            headers: ["Type", "Description"],
            rows: [
              ["Gestion générale", "Ex : amélioration continue, gestion des risques"],
              ["Gestion des services", "Celles évaluées à l’examen ITIL"],
              ["Gestion technique", "Développement, infrastructure, support technique"],
            ],
          },
          {
            type: "callout",
            tone: "info",
            text: "À l’examen ITIL Foundation, on se concentre surtout sur les pratiques de gestion des services.",
          },
        ],
      },
      {
        title: "3. Amélioration continue",
        blocks: [
          {
            type: "list",
            items: [
              "Améliorer les services",
              "Améliorer les pratiques",
              "Améliorer l’organisation",
            ],
          },
          {
            type: "callout",
            tone: "note",
            text: "S’appuie sur le modèle d’amélioration continue vu au module 6.",
          },
        ],
      },
      {
        title: "4. Gestion des incidents",
        blocks: [
          {
            type: "list",
            items: [
              "Objectif : restaurer le service normal le plus rapidement possible",
              "Réduire l’impact sur les utilisateurs",
              "Ne cherche pas la cause racine",
            ],
          },
          {
            type: "callout",
            tone: "info",
            text: "Exemples : panne réseau, bug applicatif.",
          },
        ],
      },
      {
        title: "5. Gestion des problèmes",
        blocks: [
          {
            type: "list",
            items: [
              "Identifier la cause racine des incidents",
              "Empêcher la réapparition des incidents",
              "Travaille avec la gestion des incidents",
            ],
          },
          {
            type: "table",
            headers: ["Concept", "Rôle"],
            rows: [
              ["Incident", "Symptôme"],
              ["Problème", "Cause"],
            ],
          },
        ],
      },
      {
        title: "6. Gestion des demandes de service",
        blocks: [
          {
            type: "list",
            items: [
              "Traite les demandes standard des utilisateurs",
              "Processus simple et souvent automatisé",
              "Exemples : création de compte, mot de passe, matériel",
            ],
          },
        ],
      },
      {
        title: "7. Centre de services (Service Desk)",
        blocks: [
          {
            type: "list",
            items: [
              "Point de contact unique entre IT et utilisateurs",
              "Reçoit les demandes et incidents",
              "Assure la communication",
            ],
          },
          {
            type: "callout",
            tone: "success",
            text: "Le service desk est orienté expérience utilisateur.",
          },
        ],
      },
      {
        title: "8. Gestion des niveaux de service",
        blocks: [
          {
            type: "list",
            items: [
              "Garantit que les services répondent aux attentes",
              "S’appuie sur les SLA et SLR",
              "Mesure la performance",
            ],
          },
        ],
      },
      {
        title: "9. Habilitation des changements",
        blocks: [
          {
            type: "list",
            items: [
              "Objectif : réduire les risques liés aux changements",
              "Standard : pré-approuvé",
              "Normal : analysé et validé",
              "Urgent : traité rapidement",
            ],
          },
          {
            type: "callout",
            tone: "note",
            text: "Le but n’est pas de bloquer mais de sécuriser les changements.",
          },
        ],
      },
      {
        title: "10. Comparaisons importantes (examen)",
        blocks: [
          {
            type: "table",
            headers: ["Concept", "Objectif"],
            rows: [
              ["Incident", "Restaurer le service"],
              ["Problème", "Éliminer la cause"],
              ["Demande", "Répondre à un besoin"],
              ["Changement", "Modifier sans risque"],
              ["Service Desk", "Point de contact"],
              ["SLA", "Engagement de service"],
            ],
          },
        ],
      },
      {
        title: "11. Lien avec les autres modules",
        blocks: [
          {
            type: "table",
            headers: ["Module", "Lien"],
            rows: [
              ["Module 3", "Principes directeurs"],
              ["Module 4", "4 dimensions"],
              ["Module 5", "Chaîne de valeur"],
              ["Module 6", "Amélioration continue"],
            ],
          },
        ],
      },
      {
        title: "12. Mémo examen",
        blocks: [
          {
            type: "list",
            items: [
              "Les pratiques remplacent les processus ITIL v3",
              "Elles soutiennent la chaîne de valeur",
              "Elles sont orientées client",
              "Elles sont interconnectées",
            ],
          },
          {
            type: "callout",
            tone: "info",
            text: "Question type : le rôle principal de la gestion des incidents est de restaurer le service rapidement.",
          },
        ],
      },
    ],
    takeaways: [
      "Les pratiques rendent ITIL opérationnel.",
      "Elles remplacent les anciens processus.",
      "Elles soutiennent la chaîne de valeur.",
      "Elles sont orientées client et valeur.",
      "Certaines pratiques sont clés pour l’examen.",
    ],
  },
}

const EN: Record<ModuleId, ModuleSummary | undefined> = {
  M2: {
    objective:
      'Understand how value is created through services and the roles of organizations, customers, providers, and service relationships (ITIL 4 foundations).',
    sections: [
      {
        title: 'Module 2 summary (EN)',
        blocks: [
          { type: 'callout', tone: 'note', text: 'English summary not added yet. Switch to FR to view the full summary.' },
        ],
      },
    ],
    takeaways: [],
  },
}

export function getModuleSummary(lang: Lang, moduleId: ModuleId): ModuleSummary | undefined {
  return (lang === 'en' ? EN : FR)[moduleId]
}
