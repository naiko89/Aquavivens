<?php

namespace App\Entity;

use App\Repository\ProvaRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProvaRepository::class)]
class Prova
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $ciao = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCiao(): ?string
    {
        return $this->ciao;
    }

    public function setCiao(string $ciao): static
    {
        $this->ciao = $ciao;

        return $this;
    }
}
