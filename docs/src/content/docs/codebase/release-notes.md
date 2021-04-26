---
title: "Release notes"
summary: "Releases"
icon: book-3-fill
---

<div className="releases">
{props.releases.map(e=>{
    return <div className="release" dangerouslySetInnerHTML={{__html:`${e.node.descriptionHTML.replace(/[\(\)]+/g,'')}`}} />
})}
</div>
