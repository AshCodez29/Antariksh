$(function () {
  const memories = [
    [
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80",
      "Star Party '25",
      "12 SEP 2026",
      "star-party",
    ],
    [
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80",
      "Astro Photo Lab",
      "12 AUG 2026",
      "workshops",
    ],
    [
      "https://images.unsplash.com/photo-1488866022504-f2584929ca5f?auto=format&fit=crop&w=900&q=80",
      "Telescope Assembly",
      "14 FEB 2026",
      "workshops",
    ],
    [
      "https://images.unsplash.com/photo-1516575150278-77136aed6920?auto=format&fit=crop&w=900&q=80",
      "Planetarium Visit",
      "10 DEC 2025",
      "outreachs",
    ],
    [
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
      "Life Cycles of Stars",
      "05 JUL 2026",
      "internal-talks",
    ],
    [
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
      "Field Trip: Dark Sky",
      "22 MAR 2026",
      "star-party",
    ],
    [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
      "Rover Build Day",
      "19 APR 2026",
      "workshops",
    ],
    [
      "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=900&q=80",
      "Launch Watch",
      "30 MAY 2026",
      "outreachs",
    ],
    [
      "https://images.unsplash.com/photo-1519608487953-e999c86e7452?auto=format&fit=crop&w=900&q=80",
      "Moonlit Meetup",
      "18 JUN 2026",
      "star-party",
    ],
    [
      "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=900&q=80",
      "Cosmic Film Night",
      "09 OCT 2025",
      "internal-talks",
    ],
  ];
  const $grid = $("#event-grid");
  const astroPhotos = [
    [
      "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=1200&q=80",
      "Starfield Study",
      "PLACEHOLDER / DEEP SKY",
    ],
    [
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=80",
      "Milky Way Drift",
      "PLACEHOLDER / WIDE FIELD",
    ],
    [
      "https://images.unsplash.com/photo-1532978379173-523e16f371f2?auto=format&fit=crop&w=900&q=80",
      "Lunar Detail",
      "PLACEHOLDER / MOON",
    ],
    [
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=900&q=80",
      "Nebula Signal",
      "PLACEHOLDER / DEEP SKY",
    ],
    [
      "https://images.unsplash.com/photo-1445905595283-21f8ae8a33d2?auto=format&fit=crop&w=900&q=80",
      "Orbiting Earth",
      "PLACEHOLDER / ORBIT",
    ],
    [
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1400&q=80",
      "Night Sky Notes",
      "PLACEHOLDER / NIGHTSCAPE",
    ],
  ];
  const renderTile = (item, index, includeType) =>
    `<article class="event-tile"${includeType ? ` data-event-type="${item[3]}"` : ""} style="transition-delay:${(index % 4) * 80}ms"><img src="${item[0]}" alt="${item[1]}" loading="lazy"><div class="tile-caption"><strong>${item[1]}</strong><span>${item[2]}</span></div></article>`;
  memories.forEach((memory, index) =>
    $grid.append(renderTile(memory, index, true)),
  );
  astroPhotos.forEach((photo, index) =>
    $("#astro-grid").append(renderTile(photo, index, false)),
  );
  $("#event-filter").on("change", function () {
    const type = String(this.value);
    const $tiles = $grid.children(".event-tile");
    $tiles.each(function () {
      $(this).toggleClass(
        "is-hidden",
        type !== "all" && String($(this).data("event-type")) !== type,
      );
    });
    const shown = $tiles.not(".is-hidden").length;
    const label =
      type === "all"
        ? "SCROLL TO REVEAL"
        : `${this.options[this.selectedIndex].text.toUpperCase()} MOMENTS`;
    $("#gallery-status").text(label);
    $("#gallery-count").text(
      `${shown} MOMENT${shown === 1 ? "" : "S"} CAPTURED`,
    );
    revealGallery();
  });
  $grid
    .on("mouseenter", ".event-tile", function () {
      $(this).find(".tile-caption").stop(true, true).fadeTo(180, 1);
    })
    .on("mouseleave", ".event-tile", function () {
      if (window.matchMedia("(min-width: 768px)").matches)
        $(this).find(".tile-caption").stop(true, true).fadeTo(160, 0);
    });
  function revealGallery() {
    const line = $(window).scrollTop() + $(window).height() * 0.9;
    $(".event-tile:not(.is-hidden):not(.in-view)").each(function () {
      if ($(this).offset().top < line) $(this).addClass("in-view");
    });
  }
  $('a[href^="#"]').on("click", function (e) {
    const $target = $(this.hash);
    if ($target.length) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: $target.offset().top - 25 }, 750);
    }
  });
  $(window).on("scroll resize load", revealGallery);
  revealGallery();
});
