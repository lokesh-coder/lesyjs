---
title: Release notes
path: /develop/release-notes
icon: book-3-fill
---

<div className="releases">
{props.github.github.repository.releases.edges.map(e=>{
    return <div className="release" dangerouslySetInnerHTML={{__html:`${e.node.descriptionHTML.replace(/[\(\)]+/g,'')}`}} />
})}
</div>
