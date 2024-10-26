/**
 * Manipulating the DOM.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
**/

//Global variables
let sectionsContainer, sectionNum
const VALUE= 150
const paraText= `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.

    Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.`

//Functions
//Add new sections function
function addSection(sectionNum){
    //Create new section with its attributes
    const newSection= document.createElement('section')
    newSection.id= `section${sectionNum}`
    newSection.dataset.nav= `Section ${sectionNum}`

    //Create new div for the section
    const newDiv= document.createElement('div')
    newDiv.className= 'landing__container'

    //Create new heading and paragraph
    const newHeading= document.createElement('h2')
    newHeading.textContent= `Section ${sectionNum}`

    const newPara= document.createElement('p')
    newPara.textContent= paraText

    //Append the heading and paragraph to the div
    newDiv.appendChild(newHeading)
    newDiv.appendChild(newPara)

    //Append the div to the section
    newSection.appendChild(newDiv)

    //Append the section to the sections container
    sectionsContainer.appendChild(newSection)

    //Append sections to the main container
    mainCont.appendChild(sectionsContainer)
}

//Make active class function
function makeActive(){
    sectionsContainer.forEach(section =>{
        const rect = section.getBoundingClientRect();
        const itemLink= document.querySelector('#navbar__list li a[href*= '+section.id+']')

        //Check the viewport
        if(rect.top <= VALUE && rect.bottom >= VALUE){
            //Add active state to the current section and corresponding link
            section.classList.add('active')
            itemLink.classList.add('active')
        }else{
            //Remove active state from other sections and corresponding link
            section.classList.remove('active')
            itemLink.classList.remove('active')
        }
     })
}

//Add new sections
//Get the list of excisting sections and the main class
const sections= document.querySelectorAll('.landing__container')
const mainCont= document.querySelector('.main')

//Put them inside a new div
sectionsContainer= document.createElement('div')
sectionsContainer.className= 'sections__container'
sections.forEach(section => {
    sectionsContainer.append(section.parentElement)
})

//Get the section number
sectionNum= sections.length +1

//Add 4 more sections
for(let i=0; i<4; i++){
    addSection(sectionNum)
    sectionNum+=1
}

//Build the nav
//Get the nav list
const navList= document.getElementById('navbar__list')

//Create new items according to the sections' headings
sectionsContainer= document.querySelector('.sections__container').childNodes
sectionsContainer.forEach(section =>{
    //Create and add new list items to navbar
    navList.innerHTML += `<li><a href= #${section.id} class= menu__link>${section.dataset.nav}</a></li>`
})


//Add class 'active' to sections and anchors when near top of viewport
//using makeActive function and scroll event listener

//Highlight anchor of the section using scroll event
document.addEventListener('scroll', makeActive)

//Scroll to section on link click
const anchors= document.querySelectorAll('#navbar__list li a')
anchors.forEach(anchor =>{
    anchor.addEventListener('click', (event) =>{
        event.preventDefault()
        const targetId= anchor.href.slice(anchor.href.indexOf('#')+1)
        const target= document.getElementById(targetId)
        target.scrollIntoView({behavior: "smooth", block: "start"})
    })
})

const list= document.querySelector('.navbar__menu')
const bars= document.querySelector('.navbar__bars')
const header= document.querySelector('.page__header')
bars.addEventListener('click', ()=>{
    list.classList.toggle('show')
})