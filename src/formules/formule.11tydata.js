export default {
  eleventyComputed: {
    title: (d) => d.f ? `Formule ${d.f.nom} : ${d.f.accroche}` : d.title,
    description: (d) => d.f ? `Formule ${d.f.nom} à ${d.f.prix} € tout compris pour une nuit à deux à Paris : ${d.f.hotel.toLowerCase()}, décoration romantique, box couple, bilan de couple et petit déjeuner.` : d.description,
    schema: (d) => d.f ? {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: `Formule ${d.f.nom}, ${d.site.nom}`,
          serviceType: "Escapade romantique pour couple",
          description: d.f.description,
          areaServed: "Île-de-France",
          provider: { "@id": `${d.site.url}/#organisation` },
          offers: { "@type": "Offer", price: String(d.f.prix), priceCurrency: "EUR", availability: "https://schema.org/InStock", url: `${d.site.url}/formules/${d.f.slug}/` }
        },
        {
          "@type": "FAQPage",
          mainEntity: d.f.faq.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.r } }))
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Formules", item: `${d.site.url}/formules/` },
            { "@type": "ListItem", position: 2, name: d.f.nom, item: `${d.site.url}/formules/${d.f.slug}/` }
          ]
        }
      ]
    } : d.schema
  }
};
