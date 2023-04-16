<?php

namespace App\Entity;

use App\Repository\SerialsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SerialsRepository::class)]
class Serials
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\Column(length: 50)]
    private string $name;

    #[ORM\Column(length: 500, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: 'TextInBytea')]
    private $logo;

    #[ORM\Column(length: 50)]
    private string $genre;

    #[ORM\Column]
    private float $raiting = 0.0;

    #[ORM\Column(type: 'DatetimeDefaultNow')]
    private $datetime_added = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private int $count_seazons = 1;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getLogo()
    {
        return $this->logo;
    }

    public function setLogo($logo): self
    {
        $this->logo = $logo;

        return $this;
    }

    public function getGenre(): ?string
    {
        return $this->genre;
    }

    public function setGenre(string $genre): self
    {
        $this->genre = $genre;

        return $this;
    }

    public function getRaiting(): ?float
    {
        return round($this->raiting,1);
    }

    public function setRaiting(float $raiting): self
    {
        $this->raiting = $raiting;

        return $this;
    }

    public function getDatetimeAdded()
    {
        return $this->datetime_added;
    }

    public function setDatetimeAdded($datetime_added): self
    {
        $this->datetime_added = $datetime_added;

        return $this;
    }

    public function getCountSeazons(): ?int
    {
        return $this->count_seazons;
    }

    public function setCountSeazons(int $count_seazons): self
    {
        $this->count_seazons = $count_seazons;

        return $this;
    }
}
