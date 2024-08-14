import "../familiar.css";

export default function FamiliarFaces() {
    return (
        <div className="familiar-faces-wrapper">
            <h4>Join thousands of inspiring creatives</h4>
            <div className="avatars">
                {[...Array(10)].map((_, index) => (
                    <a href="#" className="avatar" key={index}>
                        <div className="avatar-overlay">
                            <img
                                src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e5704bcb847d3c76e67a52_l8mvVzVMjCWFcPLY-rogie-avatar.png"
                                loading="lazy"
                                width="200"
                                alt=""
                                className="image-42"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/5ea094d69feadb4133a3d1dd/62c6dfd8bba7cef8abf5768a_arrowwhite.svg"
                                loading="lazy"
                                alt="arrow"
                                className="arrow-icon"
                            />
                        </div>
                    </a>
                ))}
            </div>
            <a href="http://bento.me/explore" target="_blank" class="link-block-341 w-inline-block">
                <div class="text-block-29">Explore the most creative Bentos</div>
                <img src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e51105614fb01066872093_miniarrow.svg" loading="lazy" alt="" /></a>
        </div>
    );
}
