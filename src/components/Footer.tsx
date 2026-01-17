const Footer = () => {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Aether Estates. All rights reserved.</p>
        <p className="text-sm mt-2">Crafting the future of luxury real estate.</p>
      </div>
    </footer>
  );
};

export default Footer;
