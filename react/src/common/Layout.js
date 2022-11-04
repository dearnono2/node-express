function Layout({ children, name }) {
  return (
    <main className={`content ${name}`}>
      <div className="inner">
        <h1>{name}</h1>
        <section>
          {children}
        </section>
      </div>
    </main>
  )
}

export default Layout;