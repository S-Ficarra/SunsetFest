import { Band } from '../../src/domain/models/band/band.model';
import { BandService } from '../../src/services/band/band.service';
import { MockBandRepository } from './mock.band.repository';
import { Socials } from '../../src/domain/models/band/socials.model';
import { RoleService } from '../../src/services/user/role.service';
import { MockUserRepository } from '../user/mock.user.repository';

describe('BandService', () => {
  let bandService: BandService;
  let bandRepository: MockBandRepository;
  let roleService: RoleService;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    roleService = new RoleService();
    userRepository.setFakeIdToTest();
    bandRepository = new MockBandRepository(userRepository);
    bandService = new BandService(bandRepository, roleService);
    bandRepository.setFakeIdToTestSocials();
    bandRepository.setFakeIdToTestBand(); //attributes id to elements of the array where the methods are tested
  });

  //getAllBand
  it('should return all bands', async () => {
    const bands = await bandService.getAllBand();
    expect(bands).toHaveLength(2);
    expect(bands).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _country: 'country1',
          _socials: expect.objectContaining({ _youtube: 'youtube1' }),
        }),
        expect.objectContaining({
          _country: 'country2',
          _socials: expect.objectContaining({ _youtube: 'youtube2' }),
        }),
      ]),
    );
  });

  //getBandById
  it("should return a band by it's id", async () => {
    let foundBand1 = await bandService.getBandById(1);
    expect(foundBand1).toEqual(
      expect.objectContaining({
        _country: 'country1',
        _socials: expect.objectContaining({ _youtube: 'youtube1' }),
      }),
    );
  });

  //createBand
  it('should return a band just created', async () => {
    const foundBand3 = new Band(
      'band3',
      'country3',
      'text3',
      new Socials(
        'fb3',
        'insta3',
        'twit3',
        'yout3',
        'spot3',
        'site3',
        'intspo3',
        'intyout3',
      ),
      'thumbnailURL',
      'bannerURL',
      userRepository.users[0],
      new Date(),
      new Date(),
    );
    await bandService.createBand(foundBand3);
    expect(foundBand3).toEqual(
      expect.objectContaining({
        _id: 3,
        _country: 'country3',
        _socials: expect.objectContaining({ _youtube: 'yout3' }),
      }),
    );
  });

  //editBand
  it('should return a band with country3 and socials yout3 & fb3', async () => {
    const bandEdited = new Band(
      'band3',
      'country3',
      'text3',
      new Socials(
        'fb3',
        'insta3',
        'twit3',
        'yout3',
        'spot3',
        'site3',
        'intspo3',
        'intyout3',
      ),
      'thumbnailURL',
      'bannerURL',
      userRepository.users[0],
      new Date(),
      new Date(),
    );
    bandEdited.setId(1);
    bandEdited.getSocials().setId(1);
    const foundBandEdited = await bandService.editBand(bandEdited);
    expect(foundBandEdited).toEqual(
      expect.objectContaining({
        _country: 'country3',
        _socials: expect.objectContaining({
          _youtube: 'yout3',
          _facebook: 'fb3',
        }),
      }),
    );
  });

  //deleteBand by and editor or admin
  it('should return the band list without the one with id 1', async () => {
    await bandService.deleteBand(userRepository.users[2], 1);
    expect(bandRepository.bands.some((band) => band.getId() === 1)).toBeFalsy();
  });

  it('should return an error', async () => {
    await expect(
      bandService.deleteBand(userRepository.users[0], 1),
    ).rejects.toThrow(Error);
  });
});
