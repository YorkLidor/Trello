export function GroupHeader() {

    return <section className="group-header">
        <section
            contentEditable={true}
            suppressContentEditableWarning={true}
            multiline={false}
        >
            <section>Backlog-Server</section>
        </section>

        <button onClick={() => alert('Dont Click me!')}>...</button>
    </section>
}