export function GroupHeader({groupTitle}) {

    return <section className="group-header">
        <section
            contentEditable={true}
            suppressContentEditableWarning={true}
        >
            <section>{groupTitle}</section>
        </section>

        <button onClick={() => alert('Dont Click me!')}>...</button>
    </section>
}