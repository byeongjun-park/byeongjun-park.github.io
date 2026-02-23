---
layout: homepage
---

## Education

* **[Mar. 2020 ~ Aug. 2025]** : Ph.D. in School of Electrical Engineering @ KAIST.
* **[Mar. 2015 ~ Feb. 2020]** : B.S. in School of Electrical Engineering @ KAIST - **Graduated Cum Laude**.
* **[Mar. 2013 ~ Feb. 2015]** : Gyeongnam Science High School.

## Work Experience

* **[Aug. 2025 ~ Present]:** Research Scientist @ EverEx (Mandatory Military Service)
* **[Mar. 2018 ~ Aug. 2018]:** AI Research Intern @ Koh Young Technology

## Research Interests

* **Video Generation/Understanding:** Recently, I am working on various applications in video generation and understandings, including controllable video generation and scalable VideoLLMs. [[CVPR'26a]](https://byeongjun-park.github.io/ReDirector/) [[CVPR'26b]](https://github.com/hyungjin-chung/VPS)
* **3D/4D Generation:** Create high-quality 3D/4D objects and scenes by using generative models such as GAN, diffusion, and RF models,
and lifting them into neural scene representations, such as point clouds, NeRF, and 3DGS. [[TPAMI'24]](https://ieeexplore.ieee.org/document/10475596)
[[CVPR'24]](https://byeongjun-park.github.io/HarmonyView/) [[CVPR'25]](https://gohyojun15.github.io/SplatFlow/) [[ICCV'25a]](https://gohyojun15.github.io/VideoRFSplat/) [[ICCV'25b]](https://byeongjun-park.github.io/SteerX/)
* **Diffusion Model Architecture:** Reimagine diffusion training as a multi-task learning, and introduce how to
synergize the training of multiple denoising tasks. [[ICLR'24]](https://byeongjun-park.github.io/DTR/)
[[ECCV'24]](https://byeongjun-park.github.io/Switch-DiT/) [[AAAI'25]](https://sangminwoo.github.io/DMP/)

## News

* **[Feb. 2026]** Two papers (1 Main and 1 Findings) are accepted to CVPR 2026.
* **[Aug. 2025]** I have joined [EverEx](https://everex.kr/en) as a research scientist.
* **[Jun. 2025]** Two papers about 3D/4D Generation are accepted to ICCV 2025.
* **[May. 2025]** I successfully defended my Ph.D. thesis.
* **[Feb. 2025]** One paper about 3D Generation is accepted to CVPR 2025.
* **[Dec. 2024]** One paper about Diffusion Model is accepted to AAAI 2025.
* **[Jul. 2024]** One paper about Diffusion Model is accepted to ECCV 2024.
* **[Mar. 2024]** One paper about Novel View Synthesis is accepted to TPAMI 2024.
* **[Feb. 2024]** One paper about One-Image-to-3D is accepted to CVPR 2024.
* **[Jan. 2024]** One paper about Diffusion Model is accepted to ICLR 2024.

{% include_relative _includes/publications.md %}

<!--
## Projects

* **[Jul. 2024 ~ Jun. 2025]:** LIG Nex1 - Underwater sonar image enhancement with AI
* **[Apr. 2023 ~ Jun. 2025]:** SOOMVI - Precise landing technology for drones
* **[Sep. 2020 ~ Feb. 2022]:** Ministry of Science and ICT (MSIT, Korea) - Digital ecology with AI
* **[Aug. 2020 ~ Aug. 2021]:** Samsung Advanced Institude of Technology (SAIT) - Monocular scene flow estimation
-->

## Honors and Services

<div class="pub-filter-buttons">
  <button class="pub-filter-btn" data-service-filter="awards">Awards</button>
  <button class="pub-filter-btn" data-service-filter="talks">Invited Talks</button>
  <button class="pub-filter-btn" data-service-filter="conference">Conference Reviewer</button>
  <button class="pub-filter-btn" data-service-filter="journal">Journal Reviewer</button>
</div>

<div class="service-category" data-service="awards">
<ul>
  <li><strong>Finalist in Qualcomm Innovation Fellowship 2024 Korea</strong> @ Dec. 2024</li>
  <li><strong>Samsung Best Paper Award in IEIE Autumn Annual Conference</strong> @ Nov. 2021</li>
  <li><strong>National Academic Excellence Scholarship (Science and Engineering, Korea)</strong> @ 2016, 2017, 2018</li>
</ul>
</div>

<div class="service-category" data-service="talks">
<ul>
  <li><strong>[Aug. 2024]</strong> ETRI - Recent Trends in 3D Content Creation</li>
</ul>
</div>

<div class="service-category" data-service="conference">
<ul>
  <li><strong>SIGGRAPH</strong> @ 2026</li>
  <li><strong>CVPR</strong> @ 2026</li>
  <li><strong>ICCV</strong> @ 2025</li>
  <li><strong>ECCV</strong> @ 2024</li>
  <li><strong>ICML</strong> @ 2025</li>
  <li><strong>ICLR</strong> @ 2025</li>
  <li><strong>NeurIPS</strong> @ 2024, 2025</li>
</ul>
</div>

<div class="service-category" data-service="journal">
<ul>
  <li><strong>IEEE Transactions on Visualization and Computer Graphics</strong> @ 2025</li>
  <li><strong>IEEE Transactions on Image Processing</strong> @ 2025</li>
</ul>
</div>

<script>
(function () {
  var buttons = document.querySelectorAll('[data-service-filter]');
  var sections = document.querySelectorAll('.service-category');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-service-filter');
      var isActive = btn.classList.contains('active');
      buttons.forEach(function (b) { b.classList.remove('active'); });
      if (isActive) {
        sections.forEach(function (sec) { sec.classList.remove('hidden'); });
      } else {
        btn.classList.add('active');
        sections.forEach(function (sec) {
          if (sec.getAttribute('data-service') === filter) {
            sec.classList.remove('hidden');
          } else {
            sec.classList.add('hidden');
          }
        });
      }
    });
  });
})();
</script>