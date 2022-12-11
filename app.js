'use strict'

const ProjectCtrl = (() => {
   const state = {
        projects:[],
        selectedProject:null
    }

    return {
        fetchProjects : async() => {
            const res = await fetch('./data.json');
            const result = await res.json();
            state.projects=result;
        },
        getProjects: () => {
            return state.projects;
        },
        findById: (id) => {
            return state.projects.find(proj => proj.id===parseInt(id))
        }
    }   
})()

const UI = ((ProjectCtrl) => {
    const loadProjectLayout = () => {
        const project = document.querySelectorAll('.proj');
    const callback = ((entries,observer)=> {
        entries.forEach(entry => {
            if(!(entry.isIntersecting)) return;
            entry.target.classList.remove('invisible','mt-8','opacity-0');
            observer.unobserve(entry.target);
        })
    })
    const projObserver = new IntersectionObserver(callback,{
        root:null,
        threshold:0.40,
        rootMargin:'0px'
    });
    project.forEach(i =>{
        projObserver.observe(i);
        i.classList.add('invisible');
    });
    }

    const loadImages = () => {
        const img = document.querySelectorAll('.project-img');
        const callback = ((entries,observer) => {
            entries.forEach(entry => {
                if(!(entry.isIntersecting)) return;
                entry.target.src = entry.target.dataset.img;
                entry.target.addEventListener('load',() => {
                    entry.target.classList.remove('blur-img');
                })
                observer.unobserve(entry.target);
            })
        })
        const projObserver = new IntersectionObserver(callback,{
            root:null,
            threshold:0.1,
            rootMargin:'0px'
        });
        img.forEach(i => projObserver.observe(i));
        }

        const populateProjects = (projects) => {
            const projectContainer = document.querySelector('.proj-wrapper');
            let html='';
            projects.forEach(proj => {
                html += `
                <div class="bg-white proj mt-8 mx-3 opacity-0 duration-700 transition-all shadow-xl z-10 p-2">
                <div class="flex xs:flex-col lg:flex-row items-center justify-center xs:6 lg:gap-12">
                <div class="flex-1 relative">
                    <img class="bg-cover project-img w-full blur-img" src="${proj.images.thumbLazy}" data-img="${proj.images.thumb}" data-id="${proj.id}" alt="${proj.title}">
                    <div class="img-thumb-backdrop flex items-center justify-center">
                    <button class="py-[0.75rem] font-bold px-4 text-sm text-white border border-white z-30 more-details-btn" data-id="${proj.id}">More Details</button>
                    </div>
                </div>
                <div class="lg:w-[2px] lg:h-56 xs:hidden bg-primary"></div>
                <div class="p-4 flex-1 space-y-6">
                    <h1 class="lg:text-3xl sm:text-2xl xs:text-2xl font-display-serif">${proj.title}</h1>
                    <p class="lg:text-lg leading-8 xs:text-sm font-open-sans text-gray-light">${proj.description}</p>
                    <div class="flex items-center justify-between">
                        <div>
                        <a href="${proj.demoUrl}" class="bg-primary no-underline text-white  lg:font-bold border-none px-4 py-2 lg:text-md xs:text-sm">Live Demo</a>
                        <a href="${proj.githubUrl||'#'}"class="bg-gray-dark no-underline text-white  lg:font-bold border-none px-4 py-2 lg:text-md xs:text-sm">Github</a>
                        </div>
                        <button class="border more-details-btn border-gray-dark no-underline text-gray-dark  lg:font-bold px-4 py-2 lg:text-md xs:text-sm" data-id="${proj.id}">More details</button>
                    </div>
                </div>
                </div>
            </div>
                `
            })
            projectContainer.insertAdjacentHTML('beforeend',html);
        }

        const showModal = (id) => {
            document.querySelector('.modal').classList.remove('hidden');
            populateModal(id)
        }
        const closeModal = () => {
            document.querySelector('.modal').classList.add('hidden');
            document.querySelector('.modal-alt-img').innerHTML='';
            document.querySelector('.tech-used').innerHTML='';
            document.querySelector('.modal-list').innerHTML='';
        }

        const populateModal = (id) => {
            const thumb = document.querySelector('.modal-thumb');
            const altImgContainer = document.querySelector('.modal-alt-img');
            const techUsedContainer = document.querySelector('.tech-used');
            const modalHdng = document.querySelector('.modal-hdng');
            const modalDesc = document.querySelector('.modal-desc');
            const listContainer = document.querySelector('.modal-list');
            const demoUrl = document.querySelector('.modal-live-demo');
            const githubUrl = document.querySelector('.modal-github');

            const project = ProjectCtrl.findById(id);
            githubUrl.classList.contains('hidden')&&githubUrl.classList.remove('hidden');

            thumb.src=project.images.thumb;
            // thumb.addEventListener('load',() => {
            //     thumb.classList.remove('.hidden');
            // });

            modalHdng.textContent=project.title;
            modalDesc.textContent=project.description;
            demoUrl.href=project.demoUrl;
            if(project.githubUrl) {
                githubUrl.href=project.githubUrl;
            } else {
                githubUrl.classList.add('hidden');
            }

            let listsHtml='';
            project.features.forEach(fea => listsHtml+= `<li class="text-md  text-gray-light pl-3">${fea}</li>`)
            listContainer.insertAdjacentHTML('beforeend',listsHtml);

            let imagesHtml = `<img class="w-28 border alt-image border-gray-light/30 p-1 rounded-md" src="${project.images.thumbLazy}" data-src="${project.images.thumb}" data-id="${project.id}" data-pos="0" alt="blog"/>`;
            project.images.altImages.forEach((img,i) => {
                imagesHtml+= `<img class="w-28 border alt-image border-gray-light/30 p-1 rounded-md" src="${img.imgLazy}" data-src="${img.img}" data-id="${project.id}" data-pos="${i+1}" alt="blog"/>`
            })
            altImgContainer.insertAdjacentHTML('beforeend',imagesHtml);

            let techUsed='';
            project.techUsed.forEach(tech => techUsed += `<span class="px-3 py-2 border text-sm text-gray-light rounded-md border-primary">${tech}</span>`);
            techUsedContainer.insertAdjacentHTML('beforeend',techUsed)
        }

        const changeAltImages = (e) => {
            if(e.target.classList.contains('alt-imgs')) return;

            const thumb = document.querySelector('.modal-thumb');
            thumb.src = e.target.dataset.src;
        }

    return {
        populateProjects,
        loadImages,
        loadProjectLayout,
        showModal,
        closeModal,
        changeAltImages
    }
})(ProjectCtrl)

const App = ((ProjectCtrl,UI) => {
    const loadEventListeners = () => {
        const detailsBtn = document.querySelectorAll('.more-details-btn');
        detailsBtn.forEach(btn => btn.addEventListener('click',(e) => {
            UI.showModal(e.target.dataset.id)
        }))

        const projectImg = document.querySelectorAll('.project-img');
        projectImg.forEach(img => img.addEventListener('click',(e) => {
            UI.showModal(e.target.dataset.id)
        }));

        document.querySelectorAll('.close-modal').forEach(el => el.addEventListener('click',UI.closeModal))
        document.querySelector('.modal-alt-img').addEventListener('click',UI.changeAltImages)
    }

    return {
        init: async() => {
           await ProjectCtrl.fetchProjects();

           const projects = ProjectCtrl.getProjects();

           UI.populateProjects(projects);
           UI.loadProjectLayout();
           UI.loadImages();

           loadEventListeners();
        }
    }
})(ProjectCtrl,UI)

App.init();