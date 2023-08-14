export const pageApiFilter = (data, itemsToRemove = []) => {
  const propertiesToDelete = [...itemsToRemove, 'yoast_head_json', '_links', 'meta', 'template', 'ping_status', 'comment_status', 'menu_order', 'parent', 'featured_media', 'author', 'link', 'type', 'status', 'slug', 'modified_gmt', 'modified', 'guid', 'date_gmt', 'date', 'id']
  propertiesToDelete.forEach(item => delete data[item])
  return data
}


export const homePageSectionApiFilter = (data, section = {}) => {
  let finalData = { acf: {} }

  if (section.so_far) {
    finalData.so_far_section = data.so_far_section
    finalData.acf.so_far_title = data.acf.so_far_title
    finalData.acf.image = data.acf.image
  }

  if (section.contact_us_slider) {
    finalData.acf.contact_us_slider = data.acf.contact_us_slider
  }

  if (section.what_we_do_section) {
    finalData.tech = data.tech
    finalData.acf.what_we_do_title = data.acf.what_we_do_title
    finalData.acf.enable_what_we_do_section = data.acf.enable_what_we_do_section
  }

  if (section.domain) {
    finalData.domain = data.domain
    finalData.acf.enable_domain_section = data.acf.enable_domain_section
  }

  if (section.testimonials) {
    finalData.acf.enable_testimonial_section = data.acf.enable_testimonial_section
  }

  return finalData
}


export const menuApiFilter = (data) => ({
  items: data.items.map(item => {
    const convertedItem = {
      classes: item.classes,
      url: item.url,
      title: item.title,
      description: item.description,
      attr_title: item.attr_title
    }

    if (item.child_items && item.child_items.length > 0) {
      convertedItem.child_items = item.child_items.map(childItem => ({
        url: childItem.url,
        title: childItem.title
      }))
    }

    return convertedItem
  })
})



export const footerApiFilter = (data) => ({
  items: data.items.map(item => {
    const convertedItem = {
      title: item.title,
    }

    if (item.child_items && item.child_items.length > 0) {
      convertedItem.child_items = item.child_items.map(childItem => ({
        url: childItem.url,
        title: childItem.title
      }))
    }

    return convertedItem
  })
})



export const homePageApiFilter = (data) => ({
  tech: data.tech,
  yoast_head: data.yoast_head,
  so_far_section: data.so_far_section,
  domain: data.domain,
  acf: {
    enable_homepage_banner: data.acf.enable_homepage_banner,
    home_page_banner_text: data.acf.home_page_banner_text,
    home_page_banner_sub_title: data.acf.home_page_banner_sub_title,
    enable_what_we_do_section: data.acf.enable_what_we_do_section,
    what_we_do_title: data.acf.what_we_do_title,
    enable_homepage_so_far_section: data.acf.enable_homepage_so_far_section,
    so_far_title: data.acf.so_far_title,
    image: data.acf.image,
    enable_benefits_of_hiring_us: data.acf.enable_benefits_of_hiring_us,
    benefits_of_hiring_us_content: data.acf.benefits_of_hiring_us_content,
    benefits_of_hiring_us: data.acf.benefits_of_hiring_us,
    contact_us_slider: data.acf.contact_us_slider,
    enable_contact_us_section: data.acf.enable_contact_us_section,
    enable_testimonial_section: data.acf.enable_testimonial_section,
    enable_domain_section: data.acf.enable_domain_section,
    home_page_banner_image: data.acf.home_page_banner_image
  }
})



export const testimonialsApiFilter = (data) => {
  return data.map(item => ({
    excerpt: item.excerpt,
    title: item.title,
    acf: item.acf,
    content: item.content
  }))
}



export const galleryApiFilter = (data) => {
  return data.map(item => ({
    gallery_meta: item.gallery_meta,
    acf: item.acf,
    title: item.title
  }))
}



export const blogListApiFilter = (data) => {
  return data.map(item => ({
    slug: item.slug,
    title: item.title,
    formatted_date: item.formatted_date,
    excerpt: item.excerpt,
    link: item.link,
    acf: {
      image: item.acf.image,
      detail_image: item.acf.detail_image
    }
  }))
}