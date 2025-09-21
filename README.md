# Paternus Financial Website

A professional website for a boutique financial services company that leverages technology to better serve clients.

## Features

- **Modern Design**: Clean, professional design with a focus on financial services
- **Responsive**: Fully responsive design that works on desktop, tablet, and mobile
- **Interactive Elements**: Animated charts, interactive forms, and smooth scrolling
- **Technology Focus**: Dedicated pages highlighting technological capabilities
- **Contact Forms**: Functional contact forms with validation
- **Performance Optimized**: Optimized for fast loading and smooth animations

## Pages

- **Home** (`index.html`): Hero section, services overview, technology preview
- **About** (`about.html`): Company story, team, mission and values
- **Services** (`services.html`): Detailed service offerings and pricing
- **Technology** (`technology.html`): Platform capabilities and innovation
- **Contact** (`contact.html`): Contact forms and business information

## File Structure

```
paternus/
├── index.html          # Homepage
├── about.html          # About page
├── services.html       # Services page
├── technology.html     # Technology page
├── contact.html        # Contact page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # Main JavaScript file
├── images/             # Image assets (empty - ready for your images)
└── README.md           # This file
```

## Setup Instructions

1. **Download/Clone**: Download all files to your local machine
2. **Upload to Web Host**: Upload all files to your web hosting provider
3. **Domain Setup**: Point your domain to the hosting directory
4. **Customization**: Update content, images, and contact information

## Customization

### Update Company Information

1. **Company Name**: Search and replace "Paternus Financial" throughout all HTML files
2. **Contact Information**: Update email and phone numbers in all pages
3. **Team Information**: Replace team member details in `about.html`
4. **Services**: Modify service descriptions in `services.html`

### Add Images

1. Add your company logo and team photos to the `images/` folder
2. Update HTML files to reference your images:
   ```html
   <img src="images/your-logo.png" alt="Company Logo">
   ```

### Update Colors and Branding

The main brand colors can be updated in `css/styles.css`:
- Primary Blue: `#2563eb`
- Secondary Colors: `#10b981` (green), `#f59e0b` (orange)
- Text Colors: `#1a1a1a` (dark), `#4a5568` (gray)

### Contact Form Integration

The contact form currently logs submissions to the browser console. To make it functional:

1. **Backend Integration**: Add server-side processing (PHP, Node.js, etc.)
2. **Email Service**: Integrate with services like EmailJS, Formspree, or Netlify Forms
3. **Database**: Store submissions in a database for follow-up

Example EmailJS integration:
```javascript
// Replace the setTimeout in main.js with:
emailjs.send('your_service_id', 'your_template_id', data)
    .then(() => {
        // Show success message
    });
```

## Browser Compatibility

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Responsive images with lazy loading
- CSS and JavaScript optimization
- Smooth animations and transitions
- Accessibility features (keyboard navigation, focus states)
- Print-friendly styles

## SEO Features

- Semantic HTML structure
- Meta descriptions and titles
- Open Graph tags ready for implementation
- Clean URL structure
- Fast loading times

## Hosting Recommendations

This website works with any standard web hosting provider:

- **Shared Hosting**: Bluehost, SiteGround, HostGator
- **Cloud Hosting**: AWS S3, Netlify, Vercel
- **CDN**: Cloudflare for improved performance

## Next Steps

1. **Content**: Replace placeholder content with your actual information
2. **Images**: Add professional photos and graphics
3. **Forms**: Set up backend processing for contact forms
4. **Analytics**: Add Google Analytics or similar tracking
5. **SSL**: Ensure HTTPS is enabled on your domain
6. **Testing**: Test on multiple devices and browsers

## Support

For technical questions about the website code, refer to the comments in the HTML, CSS, and JavaScript files. Each section is well-documented for easy modification.

## License

This website template is created for Paternus Financial. Modify as needed for your business use.