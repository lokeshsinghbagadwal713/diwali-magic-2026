export default function App() {
  const [page, setPage] = useState("home");

  if (page === "create") {
    return (
      <CreateWish
        onBack={() => setPage("home")}
      />
    );
  }

  return (
    <main>
      <FloatingParticles />

      <Navbar />

      <Hero />

      <MagicSection />

      <CreateSection
        onCreate={() => {
          setPage("create");
          window.scrollTo(0, 0);
        }}
      />

      <Footer />
    </main>
  );
}